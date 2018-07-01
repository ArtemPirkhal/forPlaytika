Ext.define('test.store.tasks.TaskList', {
    extend: 'Ext.data.Store',

    alias: 'store.TaskList',

    requires: [
        'test.model.tasks.Task'
    ],

    model: 'test.model.tasks.Task',

    data: [
        {
            id: 0, name: 'First', startDate: new Date(), endDate: new Date(), status: 'stopped'.toUpperCase()
        },
        {
            id: 1, name: 'Second', startDate: new Date(), endDate: new Date(), status: 'stopped'.toUpperCase()
        },
        {
            id: 2, name: 'Third', startDate: new Date(), endDate: new Date(), status: 'running'.toUpperCase()
        },
        {
            id: 3, name: 'Fourth', startDate: new Date(), endDate: new Date(), status: 'stopped'.toUpperCase()
        }
    ],


    isDirty: function () {
        var records = this.getRange();

        for (var i = 0; i < records.length; i++) {
            var rec = records[i];
            if (rec.dirty == true) {
                return true;
            }
        }
    }

});
