/**
* (c) 2016 Highsoft AS
* Authors: Jon Arild Nygard
*
* License: www.highcharts.com/license
*/
/* eslint no-console: 0 */
'use strict';
import H from '../parts/Globals.js';
import '../parts/Utilities.js';
import './grid-axis.js';
import '../modules/broken-axis.src.js';
var argsToArray = function (args) {
		return Array.prototype.slice.call(args, 1);
	},
	indentPx = 10,
	wrap = H.wrap,
	each = H.each,
	extend = H.extend,
	map = H.map,
	pick = H.pick,
	GridAxis = H.Axis,
	GridAxisTick = H.Tick;
var reduce = function (arr, func, previous, context) {
	context = context || this;
	arr = arr || []; // @note should each be able to handle empty values automatically?
	each(arr, function (current, i) {
		previous = func.call(context, previous, current, i, arr);
	});
	return previous;
};


/**
 * some - Equivalent of Array.prototype.some
 *  
 * @param  {Array} arr       Array to look for matching elements in.
 * @param  {function} condition The condition to check against. 
 * @return {boolean}            Wether some elements pass the condition. 
 */ 
var some = function (arr, condition) {
	var result = false;
	each(arr, function (element, index, array) {
		if (!result) {
			result = condition(element, index, array);
		}
	});
	return result;
};
var objectKeys = function (obj) {
	var result = [],
		prop;
	for (prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			result.push(prop);
		}
	}
	return result;
};
/**
 * Creates an object map from parent id to childrens index.
 * @param {Array} data List of points set in options.
 * @param {string} data[].parent Parent id of point.
 * @param {Array} ids List of all point ids.
 * @returns {Object} Map from parent id to children index in data.
 */
var getListOfParents = function (data, ids) {
	var listOfParents = reduce(data, function (prev, curr) {
			var parent = pick(curr.parent, '');
			if (prev[parent] === undefined) {
				prev[parent] = [];
			}
			prev[parent].push(curr);
			return prev;
		}, {}),
		keys = objectKeys(listOfParents);

	// If parent does not exist, hoist parent to root of tree.
	each(keys, function (parent, list) {
		var children = listOfParents[parent];
		if ((parent !== '') && (H.inArray(parent, ids) === -1)) {
			each(children, function (child) {
				list[''].push(child);
			});
			delete list[parent];
		}
	});
	return listOfParents;
};
var getNode = function (id, parent, level, data, mapOfIdToChildren) {
	var descendants = 0,
		height = 0;
	return {
		children: map((mapOfIdToChildren[id] || []), function (child) {
			var node = getNode(child.id, id, (level + 1), child, mapOfIdToChildren);
			descendants = descendants + 1 + node.descendants;
			height = Math.max(node.height + 1, height);
			return node;
		}),
		data: data,
		depth: level - 1,
		descendants: descendants,
		height: height,
		id: id,
		level: level,
		parent: parent
	};
};
var getTree = function (data) {
	var ids = map(data, function (d) {
			return d.id;
		}),
		mapOfIdToChildren = getListOfParents(data, ids);
	return getNode('', null, 1, null, mapOfIdToChildren);
};
var override = function (obj, methods) {
	var method,
		func;
	for (method in methods) {
		if (methods.hasOwnProperty(method)) {
			func = methods[method];
			wrap(obj, method, func);
		}
	}
};

/**
 * getCategoriesFromTree - getCategories based on a tree
 *  
 * @param  {object} tree Root of tree to collect categories from 
 * @return {Array}      Array of categories
 */ 
var getCategoriesFromTree = function (tree) {
	var categories = [];
	if (tree.data) {
		categories.push(tree.data.name);
	}
	each(tree.children, function (child) {
		categories = categories.concat(getCategoriesFromTree(child));
	});
	return categories;
};
var mapTickPosToNode = function (node, key) {
	var map = {},
		value;
	if (node.data) {
		value = node.data[key];
		map[value] = node;
	}
	each(node.children, function (child) {
		extend(map, mapTickPosToNode(child, key));
	});
	return map;
};

var getBreakFromNode = function (node, pos) {
	var from = pos + 0.5,
		to = from + node.descendants;
	return {
		from: from,
		to: to
	};
};
/**
 * Gets data from all series using the axis.
 * @param  {object}  axis          the axis to check for
 * @param  {boolean} axis.isXAxis  whether or not the axis is an X-axis (truthy)
 * @param  {object}  chart         the chart containing the options series
 * @param  {object}  chart.options the chart options
 * @returns {Array}                 an array containing all data from all series
 *                                 using the axis
 */
var getAxisData = function (axis, chart) {
	var axisData = [],
		axisDir = axis.isXAxis ? 'xAxis' : 'yAxis',
		seriesAxis,
		chartAxis;

	each(chart.options.series, function (series) {
		seriesAxis = series[axisDir];
		chartAxis = chart[axisDir];
		// Get the series which use this axis
		if (
			// Series yAxis is the same as this axis
			(seriesAxis && chartAxis[seriesAxis] === axis) ||
			// Series yAxis is not set, check if this is first yAxis
			!seriesAxis && chartAxis[0] === axis
		) {
			axisData = axisData.concat(series.data);
		}
	});
	return axisData;
};

var isCollapsed = function (axis, node, pos) {
	var breaks = (axis.options.breaks || []),
		obj = getBreakFromNode(node, pos);
	return some(breaks, function (b) {
		return b.from === obj.from && b.to === obj.to;
	});
};
var collapse = function (axis, node, pos) {
	var breaks = (axis.options.breaks || []),
		obj = getBreakFromNode(node, pos);
	breaks.push(obj);
	axis.update({
		breaks: breaks
	});
};
var expand = function (axis, node, pos) {
	var breaks = (axis.options.breaks || []),
		obj = getBreakFromNode(node, pos);
	// Remove the break from the axis breaks array.
	breaks = reduce(breaks, function (arr, b) {
		if (b.to !== obj.to || b.from !== obj.from) {
			arr.push(b);
		}
		return arr;
	}, []);
	axis.update({
		breaks: breaks
	});
};
var toggleCollapse = function (axis, node, pos) {
	if (isCollapsed(axis, node, pos)) {
		expand(axis, node, pos);
	} else {
		collapse(axis, node, pos);
	}
};
override(GridAxis.prototype, {
	init: function (proceed, chart, userOptions) {
		var axis = this,
			isTreeGrid = userOptions.type === 'tree-grid',
			axisData = [],
			tree,
			options;

		if (isTreeGrid) {
			userOptions.reversed = true;
		}

		// Now apply the original function with the original arguments,
		// which are sliced off this function's arguments
		proceed.apply(axis, argsToArray(arguments));
		options = axis.options;
		if (isTreeGrid) {
			// Gather data from all series with same treeGrid axis
			axisData = getAxisData(axis, chart);
			// NOTE Axis is destroyed in update, so usually the tree has to be rebuilt.
			axis.tree = tree = pick(axis.tree, getTree(axisData));
			// TODO Do this before proceed to avoid resetting hasNames and showLastLabel
			axis.categories = getCategoriesFromTree(tree);
			axis.hasNames = true;
			options.showLastLabel = true;
			axis.treeGridMap = mapTickPosToNode(tree, (axis.isXAxis ? 'x' : 'y'));
		}
	},
	/**
	 * Override to add indentation to axis.maxLabelLength.
	 * @param  {Function} proceed the original function
	 * @returns {undefined}
	 */
	getMaxLabelLength: function (proceed) {
		var axis = this,
			retVal = proceed.apply(axis, argsToArray(arguments)),
			treeDepth = axis.tree && axis.tree.height;

		console.log(axis);

		if (axis.options.type === 'tree-grid') {
			retVal += indentPx * 2 * (treeDepth - 1);
		}

		return retVal;
	}
});
override(GridAxisTick.prototype, {
	renderLabel: function (proceed, xy, old, opacity, index) {
		var tick = this,
			pos = tick.pos,
			axis = tick.axis,
			label = tick.label,
			treeGridMap = axis.treeGridMap,
			options = axis.options,
			node;
		if (options.type === 'tree-grid' && index >= 0) {
			node = treeGridMap[pos];
			if (node && node.depth) {
				xy.x += (node.depth - 1) * indentPx;
			}
			if (label && label.element) {
				H.addEvent(label.element, 'click', function () {
					var axis = tick.axis,
						pos = tick.pos,
						node = axis.treeGridMap[pos];
					toggleCollapse(axis, node, pos);
				});
			}
		}
		proceed.apply(tick, argsToArray(arguments));
	}
});
