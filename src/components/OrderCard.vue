<template>
    <v-col cols="12" lg="3" md="4" sm="6">
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
                class="white--text align-end"
                height="370px"
                :src="item.cover_image"
            >
            </v-img>
            <v-card-title v-text="item.title" />

            <v-card-subtitle class="pb-0" v-text="`Pay ${item.total_price} points for ${item.count} Pcs`" />

            <v-card-text class="text-primary">
                <div>Status: <span :style="{ color: item.status == 'Paid' ? 'blue' : 'red'}">{{item.status}}</span>
                </div>
            </v-card-text>

            <v-card-subtitle v-if="item.status == 'Order'" v-text="`Please complete payment`" />

            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    v-if="USER && item.status == 'Order'"
                    @click="showDialogPayment(item.id)"
                >
                    Payment
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="intDialogVisible" scrollable max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Payment</span>
                </v-card-title>
                <v-card-text>
                    <div class="text-right">
                        Are you sure want to pay {{ item.total_price }} poins for {{item.count}} Pcs
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="intDialogVisible = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="paymentButton(item)">Pay</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
    import axios from 'axios';
    import { mapGetters} from "vuex";
    export default {
        name: "ProductGridItem",
        props: ['item'],
        data() {
            return {
                payload: {},
                intDialogVisible: false
            }
        },
        computed: {
            ...mapGetters('Account', [
                'USER'
            ]),
        },
        methods: {
            // ...mapActions('Cart', [
            //     'BOOK_ADDED_TO_CART'
            // ]),
            showDialogPayment() {
                this.intDialogVisible = true;
            },
            async paymentButton(item) {
                let userLogin = this.USER;
                try {
                    let resPayBook = await axios.post(`${process.env.VUE_APP_BASE_URL}/user-book/pay`, {
                        userId: userLogin.id,
                        book: item
                    });
                    console.log(resPayBook);
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