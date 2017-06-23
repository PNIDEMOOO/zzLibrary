<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 您的借书信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="userInfo">
            <p>借书期限：<span>30天</span></p>
            <p>剩余可借：<span>{{this.userinfo.available}}</span>本</p>
            <p>过期本数：<span>{{this.userinfo.dated}}</span>本</p>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 您的借书记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="this.userRecord" style="width:100%" border ref="multipleTable">
            <el-table-column prop="book" label="书名">
            </el-table-column>
            <el-table-column prop="borrow_time" label="借书日期" align="center" sortable width="180">
            </el-table-column>
            <el-table-column prop="deadline" label="还书日期" align="center" sortable width="180">
            </el-table-column>
            <el-table-column prop="isclosed" label="是否归还" align="center" sortable width="120">
                <template scope="scope">
                    <i v-if="scope.row.isclosed" class="iconfont icon-false"></i>
                    <i v-if="!scope.row.isclosed" class="iconfont icon-true"></i>
                </template>
            </el-table-column>
            <el-table-column prop="renew" label="可续借次数" align="center" width="80">
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
        props: ['user', 'userinfo', 'userRecord'],
        data() {
            return {}
        },
        created(){
        },
        methods: {
            handleEdit(index, row) {
                console.log(row)
                this.$http.post(urlconf.Renew(this.user.token), {
                    username: this.user.user,
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
