<template>
    <div class="toolbar">
        <v-toolbar dark color="primary">
            <router-link to="/">
                <img src="@/assets/images.jpg" height="40"/>
            </router-link>
            <v-toolbar-title color="light">
                <router-link to="/"><v-btn text>BookStore</v-btn></router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items v-if="IS_ADMIN">
                <v-btn text tile :to="{name: 'add-book'}">
                    <v-icon left>mdi-pencil</v-icon> Add Book
                </v-btn>
            </v-toolbar-items>

            <!-- <v-spacer></v-spacer> -->
            <v-toolbar-items>
                <v-btn text v-if="USER" :to="{name: 'order'}">Order</v-btn>
            </v-toolbar-items>
            <v-btn icon :to="{name: 'cart'}">
                <v-badge top color="green">
                    <span slot="badge">{{ITEMS_TOTAL_COUNT}}</span>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>

            <v-toolbar-items>
                <v-btn text v-if="IS_GUEST" @click="toggleLoginDialogVisibility">Login</v-btn>
                <v-btn text v-if="!IS_GUEST" @click="logoutBtn()">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <LoginDialog :dialogVisible="loginDialog" @close="toggleLoginDialogVisibility"/>
        <v-btn style="float: right;" text>
            <div class="text-right" style="margin-right: 20px;">You have <span style="color: blue">{{USER ? USER.point : 0}}</span> Pts</div>
        </v-btn>
    </div>
</template>

<script>
import LoginDialog from "./LoginDialog";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",
    components: {
        LoginDialog
    },
    computed: {
        ...mapGetters('Account', [
            'IS_GUEST',
            'IS_ADMIN',
            'USER'
        ]),
        ...mapGetters('Cart', [
            'ITEMS_TOTAL_COUNT',
        ])
    },
    data() {
        return {
            loginDialog: false
        }
    },
    methods: {
        ...mapActions('Account', [
            'LOGOUT_USER'
        ]),
        ...mapActions('Cart', [
            'CLEAR_BOOKS'
        ]),
        toggleLoginDialogVisibility() {
            this.loginDialog = !this.loginDialog;
        },
        logoutBtn() {
            this.LOGOUT_USER()
            this.CLEAR_BOOKS()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>