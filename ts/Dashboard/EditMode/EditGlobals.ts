const PREFIX = 'highcharts-dashboard-edit-';

const EditGlobals: EditGlobals = {
    prefix: PREFIX,
    classNames: {
        resizeSnap: PREFIX + 'resize-snap',
        resizeSnapX: PREFIX + 'resize-snap-x',
        resizeSnapY: PREFIX + 'resize-snap-y',
        separator: PREFIX + 'separator',
        enableEditModeItem: PREFIX + 'item-enable',
        saveLocalItem: PREFIX + 'item-save-local',
        contextMenuBtn: PREFIX + 'context-menu-btn',
        contextMenu: PREFIX + 'context-menu',
        contextMenuItem: PREFIX + 'context-menu-item',
        editModeEnabled: PREFIX + 'enabled',
        editToolbar: PREFIX + 'toolbar',
        editToolbarItem: PREFIX + 'toolbar-item',
        editToolbarOptions: PREFIX + 'toolbar-options',
        editToolbarOptionsShow: PREFIX + 'toolbar-show',
        editToolbarOptionsHide: PREFIX + 'toolbar-hide'
    },
    lang: {
        editMode: 'Edit mode',
        saveLocal: 'Save locally'
    }
};

interface EditGlobals {
    prefix: string;
    classNames: EditGlobals.ClassNamesOptions;
    lang: EditGlobals.LangOptions;
}

namespace EditGlobals {
    export interface ClassNamesOptions {
        resizeSnap: string;
        resizeSnapX: string;
        resizeSnapY: string;
        separator: string;
        enableEditModeItem: string;
        saveLocalItem: string;
        contextMenuBtn: string;
        contextMenu: string;
        contextMenuItem: string;
        editModeEnabled: string;
        editToolbar: string;
        editToolbarItem: string;
        editToolbarOptions: string;
        editToolbarOptionsShow: string;
        editToolbarOptionsHide: string;
    }

    export interface LangOptions {
        editMode?: string;
        saveLocal?: string;
    }

    export type TLangKeys = 'editMode'|'saveLocal'|'separator';
}

export default EditGlobals;
