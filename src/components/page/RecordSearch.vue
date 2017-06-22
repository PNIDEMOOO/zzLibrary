<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 复本借阅记录查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <p>{{$data}}</p>
        <el-input v-model="copyId" type="text" placeholder="请输入复本ID" style="width: 200px"></el-input>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-table :data="copyRecords" border style="width: 912px" ref="multipleTable">
            <el-table-column prop="book" label="书名" sortable width="200">
            </el-table-column>
            <el-table-column prop="borrow_time" label="借书日期" sortable width="170">
            </el-table-column>
            <el-table-column prop="deadline" label="还书日期" sortable width="170">
            </el-table-column>
            <el-table-column prop="renew" label="续借次数" sortable width="120">
            </el-table-column>
            <el-table-column prop="isclosed" label="是否归还" sortable width="120">
            </el-table-column>
            <el-table-column prop="operator" label="经手人" sortable width="100">
            </el-table-column>
        </el-table>
        <div v-if="allBook&&!bookInfo">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 全部借阅记录
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table style="width: 100%" :data="allBook.books" border ref="multipleTable">
                <el-table-column prop="isbn" label="ISBN" width="150">
                </el-table-column>
                <el-table-column prop="title" label="书名" width="300">
                </el-table-column>
                <el-table-column prop="author" label="作者" sortable width="150">
                </el-table-column>
                <el-table-column prop="price" label="价格" sortable width="100">
                </el-table-column>
                <el-table-column prop="edition" label="出版信息" sortable width="230">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="prev, pager, next, jumper"
                    :total=allBook.total*20>
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
                copyRecords: [],
                currentPage: 1,
                allRecords: []
            }
        },
        created(){
            this.$http.get(urlconf.getAllRecords(this.admin.token, this.currentPage)).then(resp => {
                this.allRecords = resp.body
            }, resp => {
                this.allRecords = null
            })
        },
        methods: {
            search() {
                this.$http.get(urlconf.getCopyRecord(this.admin.token, this.copyId)).then(resp => {
                    this.copyRecords = resp.body
                }, resp => {
                    this.copyRecords = null
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.$http.get(urlconf.getAllRecords(this.admin.token, this.currentPage)).then(resp => {
                    this.allRecords = resp.body
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
