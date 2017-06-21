<template>
    <div class="table">
        hhhh
        <p>{{admin}}</p>
        <!--<div class="userInfo">-->
            <!--<p>借书期限：<span>30天</span></p>-->
            <!--<p>剩余可借：<span>{{this.userinfo.available}}</span>本</p>-->
            <!--<p>过期本数：<span>{{this.userinfo.dated}}</span>本</p>-->
        <!--</div>-->
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item><i class="el-icon-menu"></i>您的借书记录</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <!--<el-table :data="this.userRecord" border style="width: 1052px" ref="multipleTable">-->
            <!--&lt;!&ndash;<el-table-column type="selection" width="55"></el-table-column>&ndash;&gt;-->
            <!--<el-table-column prop="book" label="书名" width="200">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="borrow_time" label="借书日期" sortable width="200">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="deadline" label="还书日期" sortable width="200">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="isclosed" label="是否归还" sortable width="150">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="renew" label="剩余可续借次数" width="200">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="isclosed" label="操作" width="100">-->
                <!--<template scope="scope">-->
                    <!--<el-button v-if="scope.row.isclosed=='否' && scope.row.renew !=0" size="small"-->
                               <!--@click="handleEdit(scope.$index, scope.row)">续借-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                User:null,
            }
        },
        created(){
//            this.getData();
            for (var i = 0; i < this.userRecord.length; i++) {
                if (this.userRecord[i].isclosed) {
                    this.userRecord[i].isclosed = "是"
                }
                else {
                    this.userRecord[i].isclosed = "否"
                }
                console.log(this.userRecord)
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$http.post(urlconf.Renew(this.user.token), {
                    username: this.user.user,
                    copy: row.copy
                }).then(resp => {
                    location.href=''
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
