Ext.define('test.view.Main', {
    extend: 'Ext.tab.Panel',
    requires: [
        'test.view.tasks.TaskGrid'
    ],
    items: [
        {
            reference: 'taskGrid',
            xtype: 'taskGrid'
        }
    ]
});
