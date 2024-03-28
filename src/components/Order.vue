<template>
    <div class="products">
        <span class="headline">List of Order</span>
        <Spinner v-if="books.isLoading" />
        <v-row style="margin-top: 40px;">
            <template v-for="item in books.items" >
                <ProductGridItem :item="item" :type="listType" :key="'grid' + item.id"/>
            </template>
        </v-row>
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    import ProductGridItem from "./OrderCard.vue";
    import {mapActions} from "vuex";
    import axios from 'axios';
    import {mapGetters} from "vuex";

    export default {
        name: "Products",
        data() {
            return {
                listType: 'grid',
                books: {}
            }
        },
        components: {
            Spinner,
            ProductGridItem,
        },
        computed: {
            ...mapGetters('Account', [
                'USER'
            ]),
        },
        methods: {
            ...mapActions({
                getBooks: 'Books/GET_BOOKS',
            }),
            changeViewList(type) {
                this.$set(this, 'listType', type);
            },
            async getUserBooks() {
                if (!this.USER) return
                let orders = await axios.get(`${process.env.VUE_APP_BASE_URL}/user-book/get?userId=${this.USER.id}`);
                this.books = {
                    error: null,
                    isLoading: false,
                    items: orders.data
                }
            }
        },

        async mounted() {
            this.getBooks();
            await this.getUserBooks();
        }
    }
</script>

<style scoped>
    .products{
        margin: 50px;
    }
</style>