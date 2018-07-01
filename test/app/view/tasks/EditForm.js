Ext.define('test.view.tasks.EditForm', {
    extend: 'Ext.form.FieldSet',

    requires: [
        'test.view.tasks.EditFormController',
        'test.view.tasks.EditFormModel'
    ],

    viewModel: 'editForm',
    controller: 'editForm',

    title: 'General options',
    xtype: 'taskEditForm',
    disabled: true,
    bind: {
        disabled: '{formShouldBeDisabled}'
    },
    items: [

        {
            xtype: 'field',
            fieldLabel: 'Id',
            readOnly: true,
            bind: {
                value: '{taskGrid.selection.id}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name',
            bind: {
                value: '{taskGrid.selection.name}'
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Start date',
            name: 'startDate',
            id: 'startDate',
            format: 'd-m-Y H:i:s',
            bind: {
                value: '{taskGrid.selection.startDate}'
            }

        },

        {
            xtype: 'datefield',
            fieldLabel: 'End date',
            name: 'endDate',
            id: 'endDate',
            format: 'd-m-Y H:i:s',
            bind: {
                value: '{taskGrid.selection.endDate}',
                minValue: '{taskGrid.selection.startDate}'
            }

        }

    ]
});
