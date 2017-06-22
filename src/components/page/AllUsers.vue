<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 全部用户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table width="600" style="width: 602px" :data="allUsers" border ref="multipleTable">
            <el-table-column prop="user" label="用户名" width="300">
            </el-table-column>
            <el-table-column prop="duration" label="借书期限" sortable width="150">
            </el-table-column>
            <el-table-column prop="isadmin" label="是否管理员" sortable width="150">
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
                allUsers: null
            }
        },
        created(){
            this.$http.get(urlconf.getAllUsers(this.admin.token)).then(resp => {
                this.allUsers = resp.body
                for (var i = 0; i < this.allUsers.length; i++) {
                    this.allUsers[i].isadmin = this.allUsers[i].isadmin ? "√" : "×"
                }
            }, resp => {
                this.allUsers = null
            })
        },
        methods: {}
    }
</script>

<style scoped>
    .crumbs {
        margin: 10px 0;
    }

    .table-title {
        font-size: 20px;
    }

</style>
