Ext.define('test.model.tasks.Task', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.validator.Length',
        'Ext.data.validator.Inclusion',
        'Ext.data.validator.Format',
        'Ext.data.validator.Date'
    ],

    identifier: {
        type: 'sequential',
        id: 'id',
        seed: 4 // TODO должно быть другое решение
    },

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string', defaultValue: ''},
        {name: 'startDate', type: 'date', defaultValue: null},
        {name: 'endDate', type: 'date', defaultValue: null},
        {name: 'status', type: 'string', defaultValue: 'STOPPED'}
    ],

    proxy: {
        type: 'ajax',
        url: '/tasks/list',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    validators: {
        id: 'presence',
        name: {type: 'length', min: 1, max: 255, message: 'Wrong length!'},
        startDate: {type: 'date', format: 'd-m-Y H:i:s', message: 'Wrong format!'},
        endDate: {type: 'date', format: 'd-m-Y H:i:s', message: 'Wrong format!'},
        status: {type: 'inclusion', list: ['RUNNING', 'STOPPED'], message: 'Wrong value!'}
    }
});
