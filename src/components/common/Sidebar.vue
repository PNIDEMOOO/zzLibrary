<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title
                            }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'BRBook',
                        title: '借书/还书'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'UserManagement',
                        title: '管理用户信息',
                        subs: [
                            {
                                index: 'AllUsers',
                                title: '全部用户信息'
                            },
                            {
                                index: 'UserRecord',
                                title: '用户借书信息'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'BookManagement',
                        title: '管理书籍',
                        subs: [
                            {
                                icon: 'el-icon-menu',
                                index: 'ADBook',
                                title: '增删书目'
                            },
                            {
                                icon: 'el-icon-menu',
                                index: 'ADCopy',
                                title: '增删复本'
                            },
                        ]
                    },

                    {
                        icon: 'el-icon-menu',
                        index: 'RecordSearch',
                        title: '借阅记录查询',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'SearchBook',
                        title: '搜索书本'
                    },
//                    {
//                        index: 'readme',
//                        title: '增减书目'
//                    },
//                    {
//                        index: 'readme',
//                        title: '管理用户信息'
//                    },
//                    {
//                        icon: 'el-icon-setting',
//                        index: 'readme',
//                        title: '自述'
//                    },
//                    {
//                        icon: 'el-icon-menu',
//                        index: '2',
//                        title: '表格',
//                        subs: [
//                            {
//                                index: 'basetable',
//                                title: '基础表格'
//                            },
//                            {
//                                index: 'vuetable',
//                                title: 'Vue表格组件'
//                            }
//                        ]
//                    },
//                    {
//                        icon: 'el-icon-date',
//                        index: '3',
//                        title: '表单',
//                        subs: [
//                            {
//                                index: 'baseform',
//                                title: '基本表单'
//                            },
//                            {
//                                index: 'vueeditor',
//                                title: '编辑器'
//                            },
//                            {
//                                index: 'markdown',
//                                title: 'markdown'
//                            },
//                            {
//                                index: 'upload',
//                                title: '文件上传'
//                            }
//                        ]
//                    },
//                    {
//                        icon: 'el-icon-star-on',
//                        index: 'basecharts',
//                        title: '图表'
//                    },
//                    {
//                        icon: 'el-icon-upload2',
//                        index: 'drag',
//                        title: '拖拽'
//                    }
                ]
            }
        },
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
