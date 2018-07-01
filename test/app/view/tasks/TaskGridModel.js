Ext.define('test.view.tasks.TaskGridModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'test.store.tasks.TaskList'
    ],

    alias: 'viewmodel.taskGrid',

    stores: {
        taskList: {
            type: 'TaskList',
            autoLoad: true
        }
    },
// Эти формулы сработали не так хорошо, как ожидалось. Если сменить в таске статус на running,
// то при выборе таска со статусом stopped формулы отрабатывали корректно, но состояние кнопок run и stop не менялось.
// Аналогисное происходило и в обратную сторону
    formulas: {
        startButtonShouldBeDisabled: {
            bind: {
                selection: '{taskGrid.selection}',
                gridSelModel: '{taskGrid.selModel}'
            },
            get: function (_self) {
                var selectedItems = _self.gridSelModel.getSelection()
                for (var i = 0; i < selectedItems.length; i++) {
                    var item = selectedItems[i];
                    if (item.get('status') === 'STOPPED') {
                        return false;
                    }
                }
                return true;
            }
        },

        stopButtonShouldBeDisabled: {
            bind: {
                selection: '{taskGrid.selection}',
                gridSelModel: '{taskGrid.selModel}'
            },
            get: function (_self) {
                var selectedItems = _self.gridSelModel.getSelection()
                for (var i = 0; i < selectedItems.length; i++) {
                    var item = selectedItems[i];
                    if (item.get('status') === 'RUNNING') {
                        return false;
                    }
                }
                return true;
            }
        }
    }

});
