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

            <v-card-subtitle class="pb-0" v-text="`Pay $${item.total_price} For ${item.count} Pcs`" />

            <v-card-text class="text--primary">
                <div>Status: {{item.status}}</div>
            </v-card-text>

            <v-card-subtitle v-if="item.status == 'Order'" v-text="`Please complete payment`" />

            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="paymentButton(item.id)"
                    v-if="USER"
                >
                    Payment
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    import { mapGetters} from "vuex";

    export default {
        name: "ProductGridItem",
        props: ['item'],
        computed: {
            ...mapGetters('Account', [
                'USER'
            ]),
        },
        methods: {
            // ...mapActions('Cart', [
            //     'BOOK_ADDED_TO_CART'
            // ]),
            paymentButton() {
                
            }
        }
    }
</script>

<style scoped>

</style>    