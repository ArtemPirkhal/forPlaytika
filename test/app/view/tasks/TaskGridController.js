Ext.define('test.view.tasks.TaskGridController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.taskGrid',

    requires: [
        'Ext.window.Toast',
        'Ext.window.MessageBox'
    ],

    onSelectHandler: function (_grid, _record, _index, _opts) {
        // это решение сработало надежней, чем формулы
        var selectedItems = this.getView().getSelectionModel().getSelection();
        var startBtn = this.lookupReference('startBtn').setDisabled(true);
        var stopBtn = this.lookupReference('stopBtn').setDisabled(true);

        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];
            if (item.get('status') === 'STOPPED') {
                startBtn.setDisabled(false);
            } else {
                stopBtn.setDisabled(false);
            }
        }
    },

    onDeselectHandler: function (_grid, _record, _index, _opts) {
        if (!_record.isValid()) {
            Ext.toast('Error: Record validation is failed!');
        }
    },

    onFilterChangeHandler: function (_filter) {
        this.getStore('taskList').filter('name', _filter.getValue());
    },

    toggleState: function (_isRunning) {
        this.lookupReference('stopBtn').setDisabled(!_isRunning);
        this.lookupReference('startBtn').setDisabled(_isRunning);
    },

    updateStatus: function (_status) {
        var selectedItems = this.getView().getSelectionModel().getSelection();

        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];
            item.set('status', _status);
        }
    },

    onAddHandler: function () {
        this.getStore('taskList').add({});
    },

    onRemoveHandler: function () {
        var selectedItems = this.getView().getSelectionModel().getSelection();

        if (selectedItems) {
            this.getStore('taskList').remove(selectedItems);
        }
    },

    onStartHandler: function () {
        this.updateStatus('RUNNING');
        this.toggleState(true);
    },

    onStopHandler: function () {
        this.updateStatus('STOPPED');
        this.toggleState(false);
    },

    onSubmitHandler: function () {
        var store = this.getStore('taskList');
        if (store.isDirty()) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to save changes?', this.onSaveChangesHandler.bind(this));
        } else {
            Ext.toast('Notice: There was no changes to save!');
        }
    },

    onCancelHandler: function () {
        var store = this.getStore('taskList');
        if (store.isDirty()) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to reject changes?', this.onRejectChangesHandler.bind(this));
        } else {
            Ext.toast('Notice: There was no changes to reject!');
        }
    },

    onSaveChangesHandler: function (_choise) {
        if (_choise === 'yes') {
            this.getStore('taskList').sync({
                success: function () {
                    Ext.toast('Info: Data saved successfully!');
                },
                failure: function () {
                    Ext.toast('Error: Cannot commit changes to server!');
                }
            });
        }
    },

    onRejectChangesHandler: function (_choise) {
        if (_choise === 'yes') {
            this.getStore('taskList').rejectChanges({});
        }
    }
});
