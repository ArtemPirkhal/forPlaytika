Ext.define('test.view.tasks.TaskGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'test.view.tasks.TaskGridController',
        'test.view.tasks.TaskGridModel',
        'test.view.tasks.EditForm'
    ],

    xtype: 'taskGrid',
    title: 'Dummy tasks',

    viewModel: 'taskGrid',
    controller: 'taskGrid',

    bind: {store: '{taskList}'},

    listeners: {
        select: 'onSelectHandler',
        deselect: 'onDeselectHandler'
    },

    publishes: 'selModel',

    selModel: {
        mode: 'MULTI'
    },

    allowDeselect: true,

    columns: [
        {
            header: 'Id',
            dataIndex: 'id'
        },
        {
            header: 'Name',
            dataIndex: 'name'
        },
        {
            xtype: 'datecolumn',
            header: 'Start date',
            dataIndex: 'startDate',
            format: 'd-m-Y H:i:s'

        },
        {
            xtype: 'datecolumn',
            header: 'End date',
            dataIndex: 'endDate',
            format: 'd-m-Y H:i:s'

        },
        {
            header: 'Status',
            dataIndex: 'status',
            renderer: function (_value) {
                return _value.toLowerCase();
            }
        }
    ],

    dockedItems: [
        {
            xtype: 'fieldset',
            width: '100%',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    handler: 'onAddHandler',
                    glyph: 'f055@FontAwesome',
                    margin: 5
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    handler: 'onRemoveHandler',
                    bind: {disabled: '{!taskGrid.selection}'},
                    glyph: 'f056@FontAwesome',
                    margin: 5

                },
                {
                    xtype: 'button',
                    text: 'Run',
                    glyph: 'f04b@FontAwesome',
                    handler: 'onStartHandler',
                    disabled: true,
                    // bind: {disabled: '{startButtonShouldBeDisabled}'}, // работает глючно
                    // bind: {disabled: '{taskGrid.selection.status === "running"}'}, // не подходит для множественного выбора
                    reference: 'startBtn',
                    margin: 5
                },
                {
                    xtype: 'button',
                    text: 'Stop',
                    glyph: 'f04d@FontAwesome',
                    handler: 'onStopHandler',
                    disabled: true,
                    // bind: {disabled: '{stopButtonShouldBeDisabled}'}, // работает глючно
                    // bind: {disabled: '{taskGrid.selection.status === "stopped"}'}, // не подходит для множественного выбора
                    reference: 'stopBtn',
                    margin: 5

                },
                {
                    xtype: 'fieldset',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: 5,
                            reference: 'filterName',
                            name: 'filterName',
                            fieldLabel: 'Name',
                            emptyText: 'Enter filter text...',
                            listeners: {
                                change: 'onFilterChangeHandler'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            dock: 'right',
            items: [
                {

                    title: 'Details',
                    items: [
                        {
                            reference: 'taskEditForm',
                            xtype: 'taskEditForm'
                        }
                    ]
                }
            ]
        },
        {
            dock: 'bottom',
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Submit',
                    handler: 'onSubmitHandler'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'onCancelHandler'
                }
            ]
        }

    ]
});
