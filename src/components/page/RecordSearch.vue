<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 复本借阅记录查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="username" type="text" placeholder="请输入用户名" style="width: 200px"></el-input>
        <el-button type="primary" @click="search()">查询</el-button>

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 全部借阅记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="this.userRecord" border style="width: 912px" ref="multipleTable">
            <el-table-column prop="book" label="书名" width="200">
            </el-table-column>
            <el-table-column prop="borrow_time" label="借书日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="deadline" label="还书日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="isclosed" label="是否归还" sortable width="150">
            </el-table-column>
            <el-table-column prop="renew" label="可续借次数" width="100">
            </el-table-column>
            <el-table-column prop="isclosed" label="操作" width="100">
                <template scope="scope">
                    <el-button v-if="scope.row.isclosed=='否' && scope.row.renew !=0" size="small"
                               @click="handleEdit(scope.$index, scope.row)">续借
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                username: '',
                userinfo: null,
                userRecord: []
            }
        },
        created(){
        },
        methods: {
            search() {
                this.$http.get(urlconf.GetUserInfo(this.admin.token, this.username)).then(resp => {
                    this.userinfo = resp.body
                }, resp => {
                    this.userinfo = null
                })
                this.$http.get(urlconf.GetUserRecord(this.admin.token, this.username)).then(resp => {
                    this.userRecord = resp.body
                    for (var i = 0; i < this.userRecord.length; i++) {
                        this.userRecord[i].isclosed = this.userRecord[i].isclosed ? "是" : "否"
                        this.userRecord[i].borrow_time = this.userRecord[i].borrow_time.replace('T', ' ')
                        this.userRecord[i].deadline = this.userRecord[i].deadline.replace('T', ' ')
                    }
                }, resp => {
                    this.userRecord = []
                })
            },
            handleEdit(index, row) {
                this.$http.post(urlconf.Renew(this.admin.token), {
                    username: this.username,
                    copy: row.copy
                }).then(resp => {
                    location.href = ''
                })
            }
        }
    }
</script>

<style scoped>
    .userInfo {
        margin-top: 20px;
        border-left: 6px solid #eee;
        padding: 10px;
        margin-bottom: 20px;
    }

    .crumbs {
        margin: 10px 0;
    }

    .table-title {
        font-size: 20px;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-del {
        border-color: #bfcbd9;
        color: #999;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
