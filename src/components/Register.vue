<template>
    <v-dialog v-model="intDialogVisible" scrollable max-width="500px">
        <v-card>
            <v-card-title style="margin-bottom: 40px;">
                <span class="headline">Register</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field
                            label="Username*"
                            v-model="payload.login"
                            required
                            :error-messages="ERROR_BY_KEY('login')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Password*"
                            v-model="payload.password1"
                            type="password"
                            required
                            :error-messages="ERROR_BY_KEY('password1')"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Confirm*"
                            v-model="payload.password2"
                            type="password"
                            required
                            :error-messages="ERROR_BY_KEY('password2')"
                    ></v-text-field>
                    <div>Retype your password</div>
                    <div v-if="passwordMatch" style="color: red;">Password did not match, try again</div>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="intDialogVisible = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="registerBtn">Create Account</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import axios from "axios";

    export default {
        name: "LoginDialog",
        props: {
            dialogVisible: Boolean,
        },
        data() {
            return {
                payload: {},
                passwordMatch: false
            }
        },
        computed: {
            ...mapGetters('Account', [
                'ERRORS',
                'ERROR_BY_KEY'
            ]),
            intDialogVisible: {
                get: function () {
                    return this.dialogVisible
                },
                set: function (value) {
                    if (!value) {
                        this.payload = {};
                        this.CLEAR_ERRORS();
                        this.$emit('close')
                    }
                }
            }
        },

        methods: {
            ...mapActions('Account', [
                'AUTH_USER',
                'CLEAR_ERRORS'
            ]),
            async registerBtn() {
                if (this.payload.password1 != this.payload.password2) {
                    this.passwordMatch = true;
                } else {
                    this.passwordMatch = false;
                    await this.AUTH_USER(this.payload);
                    const errors = this.ERRORS;
                    if (errors == null) this.$set(this, 'intDialogVisible', false)
                    await axios.post(`${process.env.VUE_APP_BASE_URL}/users/register`, this.payload );
                }
            }
        }
    }
</script>

<style scoped>

</style>