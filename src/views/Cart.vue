<template>
    <div>
        <v-simple-table height="300px" v-if="ITEMS.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left" width="50%">Title</th>
                    <th class="text-center">Count</th>
                    <th class="text-right">Total Price</th>
                    <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in ITEMS" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td class="text-center">{{ item.count }}</td>
                    <td class="text-right">${{ item.total }}</td>
                    <td class="text-center">
                        <v-btn-toggle>
                            <v-btn outlined fab small color="primary" @click="BOOK_REMOVED_FROM_CART(item.id)">
                                <h1>-</h1>
                            </v-btn>
                            <v-btn outlined  fab small color="primary"  @click="BOOK_ADDED_TO_CART(item.id)" :disabled="!IS_IN_STOCK(item.id)">
                                <h1>+</h1>
                            </v-btn>
                            <v-btn outlined color="error" fab small @click="ALL_BOOKS_REMOVED_FROM_CART(item.id)">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="text-right">Total: ${{ORDER_TOTAL}}</td>
                    <td></td>
                </tr>
                </tbody>
                <div style="float: right;">
                    <v-btn color="blue darken-1" v-if="USER" text @click="orderButton()">Order</v-btn>
                </div>
            </template>
        </v-simple-table>
        <p v-else>Cart is empty</p>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: "Cart",
        computed: {
            ...mapGetters('Cart', [
                'ITEMS',
                'ORDER_TOTAL',
                'IS_IN_STOCK'
            ]),
            ...mapGetters('Account', [
                'USER'
            ]),
        },
        methods: {
            ...mapActions('Cart', [
                'BOOK_ADDED_TO_CART',
                'BOOK_REMOVED_FROM_CART',
                'ALL_BOOKS_REMOVED_FROM_CART',
                'CLEAR_BOOKS'
            ]),
            async orderButton() {
                let items = this.ITEMS
                let userLogin = this.USER;
                try {
                    await axios.post(`${process.env.VUE_APP_BASE_URL}/user-book/order`, {
                        userId: userLogin.id,
                        books: items
                    });
                    this.CLEAR_BOOKS()
                    this.$router.push('/')
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style scoped>

</style>