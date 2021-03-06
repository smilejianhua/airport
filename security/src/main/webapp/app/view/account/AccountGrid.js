Ext.define('security.view.account.AccountGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountgrid',

    title: '账号列表',

    initComponent: function(arguments) {
        
        var me = this;

        Ext.applyIf(me, {
            store: 'AccountStore',
            columnLines: true,
            columns: [{
                xtype: 'rownumberer'
            },{
                text: '登录名',
                dataIndex: 'loginName',
                width: 150
            },{
                text: '密码',
                dataIndex: 'password',
                width: 300
            },{
                xtype: 'booleancolumn',
                text: '是否启用',
                trueText: '是',
                falseText: '否',
                dataIndex: 'enabled',
                flex: 1
            }]
        });

        me.callParent(arguments);
    }

});
            
