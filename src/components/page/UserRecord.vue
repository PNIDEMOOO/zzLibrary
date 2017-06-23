<template>
    <div class="table">
        <el-input v-model="username" type="text" placeholder="请输入用户名" style="width: 200px"></el-input>
        <el-button type="primary" @click="search()">查询</el-button>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 用户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="userinfo" class="userInfo">
            <p>借书期限：<span>30天</span></p>
            <p>剩余可借：<span>{{userinfo.available}}</span>本</p>
            <p>过期本数：<span>{{userinfo.dated}}</span>本</p>
        </div>
        <div v-if="!userinfo" class="userInfo">
            <p>请输入正确的用户名进行查询</p>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 该用户的借书记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="this.userRecord" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="book" label="书名">
            </el-table-column>
            <el-table-column prop="borrow_time" label="借书日期" align="center" sortable width="180">
            </el-table-column>
            <el-table-column prop="deadline" label="还书日期" align="center" sortable width="180">
            </el-table-column>
            <el-table-column prop="isclosed" label="是否归还" align="center" sortable width="120">
                <template scope="scope">
                    <!--<i v-if="!scope.row.isclosed" class="iconfont icon-false"></i>-->
                    <!--<i v-if="scope.row.isclosed" class="iconfont icon-true"></i>-->
                    <svg v-if="!scope.row.isclosed" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-false"></use>
                    </svg>
                    <svg v-if="scope.row.isclosed" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-true"></use>
                    </svg>
                </template>
            </el-table-column>
            <el-table-column prop="renew" label="可续借次数" align="center" width="110">
            </el-table-column>
            <el-table-column prop="isclosed" label="操作" align="center" width="80">
                <template scope="scope">
                    <el-button v-if="!scope.row.isclosed && scope.row.renew !=0" size="small"
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
