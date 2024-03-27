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

            <v-card-subtitle class="pb-0" v-text="item.writer" />

            <v-card-text class="text--primary">
                <div>Price: {{item.point}} points</div>
            </v-card-text>
            <v-card-subtitle v-text="'Tag : '+item.tag" />

            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    @click="BOOK_ADDED_TO_CART(item.id)"
                    v-if="IS_IN_STOCK(item.id)"
                >
                    Add to cart
                </v-btn>

                <v-btn
                    color="orange"
                    text
                    disabled
                    v-if="!IS_IN_STOCK(item.id)"
                >
                    Out of stock
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "ProductGridItem",
        props: ['item'],
        computed: {
            ...mapGetters('Cart', [
                'ITEMS_COUNT_BY_ID',
                'IS_IN_STOCK'
            ]),
        },
        methods: {
            ...mapActions('Cart', [
                'BOOK_ADDED_TO_CART'
            ])
        }
    }
</script>

<style scoped>

</style>