<template>
    <div class="BRBook-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 录入/删除书本
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bookInfoForm">
            <div class="form-box">
                <el-form label-width="40px">
                    <el-form-item label="ISBN" prop="isbn">
                        <el-input v-model="isbn" style="width: 200px" placeholder="输入书本的ISBN"></el-input>
                        <el-button type="primary" @click="search()">查询</el-button>
                        <el-p class="tip" v-if="hasBookInfo">馆内有此书</el-p>
                        <el-p class="tip" v-if="!this.hasBookInfo && this.bookInfo && !this.bookInfo.hasOwnProperty('ErrorCode')">馆内无此书，可录入</el-p>
                        <el-p class="tip" v-if="!this.hasBookInfo && this.bookInfo && this.bookInfo.hasOwnProperty('ErrorCode')">此ISBN无效</el-p>
                    </el-form-item>
                </el-form>
                <el-form v-if="hasBookInfo" :model="hasBookInfo" ref="hasBookInfo" label-width="40px">
                    <el-form-item label="书名" prop="title">
                        <p>{{hasBookInfo.title}}</p>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <p>{{hasBookInfo.author}}</p>
                    </el-form-item>
                    <el-form-item label="版本" prop="edition">
                        <p>{{hasBookInfo.edition}}</p>
                    </el-form-item>
                    <el-form-item label="价钱" prop="price">
                        <p>{{hasBookInfo.price}}</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="deleteBook()">删除</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="!this.hasBookInfo && this.bookInfo && !this.bookInfo.hasOwnProperty('ErrorCode')" :model="bookInfo" ref="bookInfo"
                         label-width="40px">
                    <el-form-item label="书名" prop="BookName">
                        <el-input v-model="bookInfo.BookName"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="Author">
                        <el-input v-model="bookInfo.Author"></el-input>
                    </el-form-item>
                    <el-form-item label="版本" prop="Publishing">
                        <el-input v-model="bookInfo.Publishing"></el-input>
                    </el-form-item>
                    <el-form-item label="价钱" prop="Price">
                        <el-input v-model="bookInfo.Price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addBook()">录入</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    export default {
        components: {ElFormItem},
        props: ['admin'],
        data() {
            return {
                isbn: null,
                bookInfo: null,
                hasBookInfo: null,
                errorCode: false
            }
        },
        created(){
        },
        methods: {
            search(){
                this.$http.get(urlconf.searchBookByISBN(this.isbn)).then(resp => {
                    this.hasBookInfo = resp.body
                    this.errorCode = false
                }, resp => {
                    this.hasBookInfo = null
                    this.$http.get(urlconf.searchOuterBook(this.admin.token, this.isbn)).then(response => {
                        this.bookInfo = response.body
                        if (this.bookInfo.hasOwnProperty("ErrorCode")) {
                            this.errorCode = true
                        }
                        else {
                            this.errorCode = false
                        }
                    }, resp => {
                        this.bookInfo = null
                    })
                })

            },
            addBook(){
                var info = {
                    "isbn": this.bookInfo.ISBN,
                    "title": this.bookInfo.BookName,
                    "author": this.bookInfo.Author,
                    "price": this.bookInfo.Price,
                    "edition": this.bookInfo.Publishing,
                    "copy": null
                }
                this.$http.put(urlconf.addBook(this.admin.token), info).then(resp => {
                    this.$message({
                        message: '录入成功！',
                        type: 'success'
                    });
                    this.bookInfo = null
                    this.isbn = null
                }, resp => {
                    this.$message({
                        message: '录入失败！',
                        type: 'error'
                    });
                })
            },
            deleteBook(){
                this.$http.delete(urlconf.deleteBook(this.admin.token, this.isbn)).then(resp => {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.hasBookInfo = null
                    this.isbn = null
                }, resp => {
                    this.$message({
                        message: '删除失败！',
                        type: 'error'
                    });
                })
            }
        }
    }
</script>

<style scoped>
    .crumbs {
        margin: 10px 0;
    }

    .table-title {
        font-size: 20px;
    }

    .bookInfoForm {
        margin-top: 30px;
    }

    .tip {
        margin-left: 20px;
        font-size: 17px;
        color: #d43f3a;
    }

</style>
