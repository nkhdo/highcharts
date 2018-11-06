/* eslint-disable */
/* *
 * Error information
 * (c) 2010-2018 Torstein Honsi
 * License: www.highcharts.com/license
 */

'use strict';

import H from './parts/Globals.js';

H.errorMessages = {
    "10": {
        "title": "Can't plot zero or subzero values on a logarithmic axis",
        "text": "<h1>Can't plot zero or subzero values on a logarithmic axis</h1><p>This error occurs in the following situations: </p><ul><li>If a zero or subzero data value is added to a logarithmic axis</li><li>If the minimum of a logarithimic axis is set to 0 or less</li><li>If the threshold is set to 0 or less</li></ul><p>Note: As of Highcharts 5.0.8 it is possible to bypass this error message by setting Axis.prototype.allowNegativeLog to true and add custom conversion functions. <a href=\"https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/samples/highcharts/yaxis/type-log-negative/\">View live demo</a>.</p>",
        "enduser": "<h1>An error message for cloud users</h1><p>Unfortunately, there is no helpful message yet.</p>"
    },
    "11": {
        "title": "Can't link axes of different type",
        "text": "<h1>Can't link axes of different type</h1><p>This error occurs if you are using the linkedTo option to link two axes of different types, for example a logarithmic axis to a linear axis. Highcharts can't link those because the calculation of ticks, extremes, padding etc. is different.</p>"
    },
    "12": {
        "title": "Highcharts expects point configuration to be numbers or arrays in turbo mode",
        "text": "<h1>Highcharts expects point configuration to be numbers or arrays in turbo mode</h1><p>This error occurs if the series.data option contains object configurations and the number of points exceeds the turboThreshold. It can be fixed by either setting the turboThreshold option to a higher value, or changing your point configurations to numbers or arrays.</p><p>See <a href=\"https://api.highcharts.com/highcharts#plotOptions.series.turboThreshold\">plotOptions.series.turboThreshold</a></p>"
    },
    "13": {
        "title": "Rendering div not found",
        "text": "<h1>Rendering div not found</h1><p>This error occurs if the <a href=\"https://api.highcharts.com/highcharts#chart.renderTo\">chart.renderTo</a> option is misconfigured so that Highcharts is unable to find the HTML element to render the chart in.</p>"
    },
    "14": {
        "title": "String value sent to series.data, expected Number",
        "text": "<h1>String value sent to series.data, expected Number</h1><p>This happens if you pass in a string as a data point, for example in a setup like this: </p><pre>series: [{\n    data: [&quot;3&quot;, &quot;5&quot;, &quot;1&quot;, &quot;6&quot;]\n}]</pre><p>Highcharts expects the data values to be numbers. The most common reason for this is that data is parsed from CSV or from a XML source, and the implementer forgot to run <code>parseFloat</code> on the parsed value.</p><p>Note: For performance reasons internal type casting is not performed, and only the first value is checked (since 2.3).</p>"
    },
    "15": {
        "title": "Highcharts expects data to be sorted",
        "text": "<h1>Highcharts expects data to be sorted</h1><p>This happens when you are trying to create a line series or a stock chart where the data is not sorted in ascending X order. For performance reasons, Highcharts does not sort the data, instead it is required that the implementer pre-sorts the data.</p>"
    },
    "16": {
        "title": "Highcharts already defined in the page",
        "text": "<h1>Highcharts already defined in the page</h1><p>This error happens the second time Highcharts or Highstock is loaded in the same page, so the <code>Highcharts</code> namespace is already defined. Keep in mind that the <code>Highcharts.Chart</code> constructor and all features of Highcharts are included in Highstock, so if you are running <code>Chart</code> and <code>StockChart</code> in combination, you only need to load the highstock.js file.</p>"
    },
    "17": {
        "title": "The requested series type does not exist",
        "text": "<h1>The requested series type does not exist</h1><p>This error happens when you are setting <code>chart.type</code> or <code>series.type</code> to a series type that isn't defined in Highcharts. A typical reason may be that your are missing the extension file where the series type is defined, for example in order to run an <code>arearange</code> series you need to load the <code>highcharts-more.js</code> file.</p>"
    },
    "18": {
        "title": "The requested axis does not exist",
        "text": "<h1>The requested axis does not exist</h1><p>This error happens when you set a series' <code>xAxis</code> or <code>yAxis</code> property to point to an axis that does not exist.</p>"
    },
    "19": {
        "title": "Too many ticks",
        "text": "<h1>Too many ticks</h1><p>This error happens when you try to apply too many ticks to an axis, specifically when you add more ticks than the axis pixel length.</p><p>With default value this will not happen, but there are edge cases, for example when setting axis categories and <code>xAxis.labels.step</code> in combination with a long data range, when the axis is instructed to create a great number of ticks.</p>"
    },
    "20": {
        "title": "Can't add object point configuration to a long data series",
        "text": "<h1>Can't add object point configuration to a long data series</h1><p>In Highstock, if you try to add a point using the object literal configuration syntax, it works only when the number of data points is below the series' <a href=\"https://api.highcharts.com/highstock#plotOptions.series.turboThreshold\">turboThreshold</a>. Instead of the object syntax, use the Array syntax.</p>"
    },
    "21": {
        "title": "Can't find Proj4js library",
        "text": "<h1>Can't find Proj4js library</h1><p>Using latitude/longitude functionality in Highmaps requires the <a href=\"http://proj4js.org\">Proj4js</a> library to be loaded.</p>"
    },
    "22": {
        "title": "Map does not support latitude/longitude",
        "text": "<h1>Map does not support latitude/longitude</h1><p>The loaded map does not support latitude/longitude functionality. This is only supported with maps from the <a href=\"https://code.highcharts.com/mapdata\">official Highmaps map collection</a> from version 1.1.0 onwards. If you are using a custom map, consider using the <a href=\"https://proj4js.org\">Proj4js</a> library to convert between projections.</p>"
    },
    "23": {
        "title": "Unsupported color format used for color interpolation",
        "text": "<h1>Unsupported color format used for color interpolation</h1><p>Highcharts supports three color formats primarily: hex (`#FFFFFF`), rgb (<code>rgba(255,255,255)</code>) and rgba (<code>rgba(255,255,255,1)</code>). If any other format, like 3-digit colors (`#FFF`), named colors (<code>white</code>) or gradient structures are used in for example a heatmap, Highcharts will fail to interpolate and just jumps to the end color.</p><p>We have chosen to preserve this limitation in order to keep the weight of the implementation at a minimum.</p>"
    },
    "24": {
        "title": "Cannot run Point.update on a grouped point",
        "text": "<h1>Cannot run Point.update on a grouped point</h1><p>This happens in Highstock when a point is grouped by data grouping, so there is no reference to the raw points.</p>"
    },
    "25": {
        "title": "Can't find Moment.js library",
        "text": "<h1>Can't find Moment.js library</h1><p>Using the global.timezone option requires the <a href=\"https://momentjs.com/\">Moment.js</a> library to be loaded.</p>"
    },
    "26": {
        "title": "WebGL not supported, and no fallback module included",
        "text": "<h1>WebGL not supported, and no fallback module included</h1><p>This happens when your browser does not support WebGL,<b>and</b> the canvas fallback module (<code>boost-canvas.js</code>) has not been included OR if the fallback module was included<b>after</b> the boost module.</p><p>Make sure you include <code>boost-canvas.js</code>, and that it's included before <code>boost.js</code>.</p>"
    },
    "27": {
        "title": "This browser does not support SVG",
        "text": "<h1>This browser does not support SVG</h1><p>This happens in old IE when the <code>oldie.js</code> module is not loaded.</p><p>If you need to target IE versions 6, 7 and 8, add the module after loading <code>highcharts.js</code>. In a website context, it is a good idea to load it in a conditional comment to avoid traffic overhead in modern browsers: </p><pre>&lt;!--[if lt IE 9]&gt;\n    &lt;script src='https://code.highcharts.com/modules/oldie.js'&gt;&lt;/script&gt;\n&lt;![endif]--&gt;</pre>"
    },
    "28": {
        "title": "Fallback to export server disabled",
        "text": "<h1>Fallback to export server disabled</h1><p>This happens when the offline export module encounters a chart it can not export successfully, and the fallback to the online export server is disabled. The offline exporting module will fail for certain browsers, and certain features (e.g. <a href=\"https://api.highcharts.com/highcharts/exporting.allowHTML\">exporting.allowHTML</a> ), depending on the type of image exporting to. For a compatibility overview, see <a href=\"https://www.highcharts.com/docs/export-module/client-side-export\">Client Side Export</a>.</p><p>For very complex charts, it is possible that export can fail in browsers that don't support Blob objects, due to data URL length limits. It is always recommended to define the <a href=\"https://api.highcharts.com/highcharts/exporting.error\">exporting.error</a> callback if you disable fallback, so that you can provide details to your users if export is not working for them.</p>"
    },
    "meta": {
        "files": [
            "errors/10/readme.md",
            "errors/10/enduser.md",
            "errors/11/readme.md",
            "errors/12/readme.md",
            "errors/13/readme.md",
            "errors/14/readme.md",
            "errors/15/readme.md",
            "errors/16/readme.md",
            "errors/17/readme.md",
            "errors/18/readme.md",
            "errors/19/readme.md",
            "errors/20/readme.md",
            "errors/21/readme.md",
            "errors/22/readme.md",
            "errors/23/readme.md",
            "errors/24/readme.md",
            "errors/25/readme.md",
            "errors/26/readme.md",
            "errors/27/readme.md",
            "errors/28/readme.md"
        ],
        "version": "6.2.0"
    }
};
