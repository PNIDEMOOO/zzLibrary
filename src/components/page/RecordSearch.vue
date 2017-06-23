<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 复本借阅记录查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="copyId" type="text" placeholder="请输入复本ID" style="width: 200px"></el-input>
        <el-button class="search-margin" type="primary" @click="search()">查询</el-button>
        <el-table v-if="copyRecords" :data="copyRecords" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="book" label="书名" sortable width="200">
            </el-table-column>
            <el-table-column prop="borrow_time" label="借书日期" align="center" sortable width="170">
            </el-table-column>
            <el-table-column prop="deadline" label="还书日期" align="center" sortable width="170">
            </el-table-column>
            <el-table-column prop="renew" label="剩余续借次数" align="center" sortable width="150">
            </el-table-column>
            <el-table-column prop="isclosed" label="是否归还" align="center" sortable width="120">
                <template scope="scope">
                    <i v-if="scope.row.isclosed" class="iconfont icon-false"></i>
                    <i v-if="!scope.row.isclosed" class="iconfont icon-true"></i>
                </template>
            </el-table-column>
            <el-table-column prop="operator" label="经手人" sortable>
            </el-table-column>
        </el-table>
        <div v-if="allRecords&&!copyRecords">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 全部借阅记录
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table style="width: 100%;margin-top: 20px" :data="allRecords.records" border ref="multipleTable">
                <el-table-column prop="copy" label="复本id" sortable width="100">
                </el-table-column>
                <el-table-column prop="user" label="借书人" sortable width="170">
                </el-table-column>
                <el-table-column prop="borrow_time" label="借书日期" align="center" sortable width="170">
                </el-table-column>
                <el-table-column prop="deadline" label="还书日期" align="center" sortable width="170">
                </el-table-column>
                <el-table-column prop="isclosed" align="center" label="是否归还" sortable width="120">
                    <template scope="scope">
                        <i v-if="scope.row.isclosed" class="iconfont icon-false"></i>
                        <i v-if="!scope.row.isclosed" class="iconfont icon-true"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="operator" label="经手人" sortable>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="40"
                    layout="prev, pager, next, jumper"
                    :total=allRecords.total*40>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                copyId: null,
                copyRecords: null,
                currentPage: 1,
                allRecords: []
            }
        },
        created(){
            this.$http.get(urlconf.getAllRecords(this.admin.token, this.currentPage)).then(resp => {
                this.allRecords = resp.body
                for (var i = 0; i < this.allRecords.records.length; i++) {
//                    this.allRecords.records[i].isclosed = this.allRecords.records[i].isclosed ? "√" : "×"
                    this.allRecords.records[i].borrow_time = this.allRecords.records[i].borrow_time.replace('T', ' ')
                    this.allRecords.records[i].deadline = this.allRecords.records[i].deadline.replace('T', ' ')
                }
            }, resp => {
                this.allRecords = null
            })
        },
        methods: {
            search() {
                this.$http.get(urlconf.getCopyRecord(this.admin.token, this.copyId)).then(resp => {
                    this.copyRecords = resp.body
                    for (var i = 0; i < this.copyRecords.length; i++) {
//                        this.copyRecords[i].isclosed = this.copyRecords[i].isclosed ? "√" : "×"
                        this.copyRecords[i].borrow_time = this.copyRecords[i].borrow_time.replace('T', ' ')
                        this.copyRecords[i].deadline = this.copyRecords[i].deadline.replace('T', ' ')
                    }
                }, resp => {
                    this.copyRecords = null
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.$http.get(urlconf.getAllRecords(this.admin.token, this.currentPage)).then(resp => {
                    this.allRecords = resp.body
                    for (var i = 0; i < this.allRecords.records.length; i++) {
                        console.log(i)
//                        this.allRecords.records[i].isclosed = this.allRecords.records[i].isclosed ? "√" : "×"
                        this.allRecords.records[i].borrow_time = this.allRecords.records[i].borrow_time.replace('T', ' ')
                        this.allRecords.records[i].deadline = this.allRecords.records[i].deadline.replace('T', ' ')
                    }
                }, resp => {
                    this.allRecords = null
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

    .search-margin {
        margin-top: 10px;
        margin-bottom: 20px;
    }
</style>
