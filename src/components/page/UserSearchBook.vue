<template>
    <div>
        <el-input class="input-margin" v-model="searchTitle" type="text" placeholder="请输入书名"
                  style="width: 300px"></el-input>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-table v-if="bookInfo" style="width: 100%" :data="bookInfo.books" border ref="multipleTable">
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
        <div v-if="bookInfo" class="block">
            <el-pagination
                @current-change="handleCurrentChange_bookInfo"
                :current-page="currentPage_bookInfo"
                :page-size="20"
                layout="prev, pager, next, jumper"
                :total=bookInfo.total*20>
            </el-pagination>
        </div>
        <div v-if="allBook&&!bookInfo">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 全部书本
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
                searchTitle: null,
                bookInfo: null,
                allBook: null,
                currentPage: 1,
                currentPage_bookInfo: 1
            }
        },
        created(){
            this.$http.get(urlconf.getAllBooks(1)).then(resp => {
                this.allBook = resp.body
            }, resp => {
                this.allBook = null
            })
        },
        methods: {
            search() {
                this.$http.get(urlconf.searchBookByTitle(this.searchTitle, 1)).then(resp => {
                    this.bookInfo = resp.body
                }, resp => {
                    this.bookInfo = null
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.$http.get(urlconf.getAllBooks(this.currentPage)).then(resp => {
                    this.allBook = resp.body
                }, resp => {
                    this.allBook = null
                })
            },
            handleCurrentChange_bookInfo(val) {
                this.currentPage_bookInfo = val
                this.$http.get(urlconf.searchBookByTitle(this.searchTitle, this.currentPage_bookInfo)).then(resp => {
                    this.bookInfo = resp.body
                }, resp => {
                    this.bookInfo = null
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

    .input-margin {
        margin-bottom: 20px;
    }

    .crumbs {
        margin: 10px 0;
    }

    .table-title {
        font-size: 20px;
    }

    .block {
        margin: 10px 0;
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
