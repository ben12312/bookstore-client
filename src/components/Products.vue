<template>
    <div class="products">
        <Spinner v-if="books.isLoading" />
        <div v-if="!books.isLoading" class="text-right">
            <div class="btn-group">
                <v-btn-toggle>
                    <v-btn @click="changeViewList('grid')">
                        <v-icon>mdi-grid</v-icon>
                    </v-btn>

                    <v-btn @click="changeViewList('list')">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
        <v-row v-if="listType === 'grid'">
            <template v-for="item in books.items" >
                <ProductGridItem :item="item" :type="listType" :key="'grid' + item.id"/>
            </template>
        </v-row>
        <v-simple-table v-if="listType === 'list'" class="mt-2">
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Author</td>
                    <td></td>
                </tr>
            </thead>
            <template v-for="item in books.items" >
                <ProductTableItem
                        :item="item"
                        :key="'list' + item.id"/>
            </template>
        </v-simple-table>
        <div style="text-align: center; padding-top: 50px;">
            <v-btn @click="loadMoreBooks">Load more</v-btn>
        </div>
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    import ProductGridItem from "./ProductGridItem";
    import ProductTableItem from "./ProductTableItem";
    import {mapActions} from "vuex";
    import axios from 'axios';

    export default {
        name: "Products",
        data() {
            return {
                listType: 'grid',
                page: 1
            }
        },
        components: {
            Spinner,
            ProductGridItem,
            ProductTableItem
        },
        computed: {
            books(){
                return this.$store.state.Books;
            }
        },
        methods: {
            ...mapActions({
                getBooks: 'Books/GET_BOOKS',
                storeBooks: 'Books/STORE_BOOKS_PER10_ACT'
            }),
            changeViewList(type) {
                this.$set(this, 'listType', type);
            },
            async loadMoreBooks() {
                this.page = this.page + 1 // create store page and get from store
                let books = await axios.get(`${process.env.VUE_APP_BASE_URL}/books/get?page=${this.page}`);
                for (let index = 0; index < books.data.length; index++) {
                    const element = books.data[index];
                    this.storeBooks(element)
                }
            }
        },

        mounted() {
            this.getBooks();
        }
    }
</script>

<style scoped>
    .products{
        margin: 50px;
    }
</style>