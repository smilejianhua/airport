Ext.define('User', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'username',
        type: 'string'
    },{
        name: 'password',
        type: 'string'
    },{
        name: 'age',
        type: 'int'
    },{
        name: 'birthday',
        type: 'date'
    },{
        name: 'enabled',
        type: 'boolean'
    }]
});

var store = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: 'groups/findByParentId'
    },
    root: {
        text: '组织机构',
        id: 1,
        expanded: true
    }
});

var userStore = Ext.create('Ext.data.Store', {
    model: 'User',
    pageSize: 2,
    proxy: {
        type: 'ajax',
        url: 'users',
        pageParam: 'page.page',
        limitParam: 'page.size',
        reader: {
           type: 'json',
           root: 'content',
           totalProperty: 'totalElements'
        }
    }
});

var tree = Ext.create('Ext.tree.Panel', {
    title: '组织机构',
    region: 'west',
    width: 270,
    bodyPadding: 3,
    collapsible: true,
    split: true,
    margin: '0 0 0 4',
    useArrows: true,
    store: store,
    dockedItems: {
        xtype: 'toolbar',
        items: [{
            text: '全部展开',
            handler: function() {
                tree.expandAll();
            }
        },'-',{
            text: '全部折叠',
            handler: function() {
                tree.collapseAll();
            }
        }]
    },
    listeners: {
        itemclick: function(tree, node, item, index, e, eOpts) {
            if (node.isLeaf()) {
                userStore.getProxy().extraParams = {
                    'search_group.id_eq': node.get('id')
                };
                userStore.loadPage(1);
            }
        }
    }
});

var usergrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    title: '用户列表',
    selType: 'checkboxmodel',
    store: userStore,
    columnLines: true,
    columns: [{
        text: '用户名',
        dataIndex: 'username',
        width: 150
    },{
        text: '密码',
        dataIndex: 'password',
        width: 260
    },{
        text: '年龄',
        dataIndex: 'age'
    },{
        xtype: 'datecolumn',
        text: '出生年月',
        dataIndex: 'birthday',
        format: 'Y年m月d日',
        width: 180
    },{
        xtype: 'booleancolumn',
        text: '是否启用',
        dataIndex: 'enabled',
        trueText: '是',
        falseText: '否',
        flex: 1
    }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: '查询'
        },'-',{
            text: '删除'
        }]
    },{
        xtype: 'pagingtoolbar',
        store: userStore,
        displayInfo: true,
        dock: 'bottom'
    }]
});

Ext.define('security.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'toolbar',
        margin: '0 0 4 0',
        items: ['->', {
            text: '注销',
            handler: function() {
                location.replace('j_spring_security_logout');
            }
        }]
    }, tree, usergrid, {
        region: 'south',
        xtype: 'toolbar',
        items: '万达信息股份有限公司版权所有v1.0',
        margin: '4 0 0 0'
    }]
});
