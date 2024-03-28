<template>
    <div class="add-book">
        <v-card>
            <v-card-title>
                <span class="headline">Add book</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field
                            label="Title*"
                            v-model="payload.title"
                            required
                            :error-messages="ERROR_BY_KEY('title')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Author*"
                            v-model="payload.author"
                            required
                            :error-messages="ERROR_BY_KEY('author')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Price*"
                            v-model="payload.price"
                            type="number"
                            required
                            :error-messages="ERROR_BY_KEY('price')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="In Stock count*"
                            v-model="payload.instock"
                            type="number"
                            required
                            :error-messages="ERROR_BY_KEY('instock')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-select
                        label="Tag"
                        v-model="payload.tag"
                        :items="['Fiction', 'Non-Fiction', 'Science', 'Essay']"
                        required
                        :error-messages="ERROR_BY_KEY('tag')"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Cover Image*"
                            v-model="payload.cover_image"
                            type="file"
                            required
                            accept="image/png, image/gif, image/jpeg"
                            :error-messages="ERROR_BY_KEY('cover_image')"
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="createBooks(payload)">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "AddBook",
        data() {
            return {
                payload: {},
                errors: {}
            }
        },

        computed: {
            ...mapGetters('Books', [
                'ERROR_BY_KEY'
            ]),
        },

        methods: {
            ...mapActions('Books', [
                'STORE_BOOKS'
            ]),
            async createBooks(payload) {
                await this.STORE_BOOKS(payload);
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>