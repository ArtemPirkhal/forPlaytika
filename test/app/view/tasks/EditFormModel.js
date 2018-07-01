Ext.define('test.view.tasks.EditFormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.editForm',

    formulas: {
        formShouldBeDisabled: {
            bind: {
                selection: '{taskGrid.selection}',
                gridSelModel: '{taskGrid.selModel}'
            },
            get: function (_self) {
                return _self.gridSelModel.getCount() !== 1;
            }
        }
    }
});