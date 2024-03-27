import {isEmpty} from "../utils/helpers";
import axios from "axios";

export default class BookStoreServices {
    ID_LAST = 4;

    booksData = [
        {
            id: 1,
            title: 'Vue.js in Action',
            author: 'Benjamin Listwon, Erik Hanchett',
            price: 45,
            instock: 5
        },
        {
            id: 2,
            title: 'Vue.js 2 Cookbook',
            author: 'Andrea Passaglia',
            price: 20,
            instock: 5
        },
        {
            id: 3,
            title: 'Vue.js: Up and Running: Building Accessible and Performant Web Apps',
            author: 'Callum Macrae',
            price: 22,
            instock: 5
        },
        {
            id: 4,
            title: 'Learning Vue.js 2',
            author: 'Olga Filipova',
            price: 35,
            instock: 5
        },
    ];

    userData = [
        {
            id: 1,
            login: 'Admin',
            password: 'Admin',
            isAdmin: true
        },
        {
            id: 2,
            login: 'User',
            password: 'User',
            isAdmin: false
        },
    ]

    async getBooks() {
        try {
            let books = await axios.get(`${process.env.VUE_APP_BASE_URL}/books/get`);
            return books.data
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async storeBook(payload) {
        try {
            const errors = this._validateBook(payload);
            if (isEmpty(errors)) {
                payload.id = ++this.ID_LAST;
                let books = await axios.post(`${process.env.VUE_APP_BASE_URL}/books/post`, payload);
                return books.data
            } else {
                return(errors);
            }
        } catch (error) {
            console.log(error);
            return []
        }
    }

    login(data) {
        return new Promise(async(resolve, reject) => {
            // setTimeout(async() => {}, 700);
            const result = await this._validateUser(data);
            if (result.success) {
                resolve(result);
            } else {
                reject(result);
            }
        });
    }

    logout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 700);
        });
    }

    _validateBook(data) {
        let errors = {};
        if (isEmpty(data.title)) errors.title = 'Title field is required';
        if (isEmpty(data.author)) errors.author = 'Author field is required';
        if (isEmpty(data.price)) errors.price = 'Price field is required';
        if (isEmpty(data.instock)) errors.instock = 'In Stock field is required';

        return errors;
    }

    _validateUser(data) {
        const {login = '', password = ''} = data;
        let errors = {};
        if (isEmpty(login)) errors.login = 'Login field is required'
        if (isEmpty(password)) errors.password = 'Password field is required'

        if (password.length && login.length) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BASE_URL}/users/get?username=${login}`)
                .then(user => {
                    if (user && user.data && user.data != '') {
                        if (user.data.password.toLowerCase() === data.password.toLowerCase()) {
                            return resolve({
                                success: true,
                                data: user.data
                            })
                        } else {
                            errors.password = 'Login or password incorrect'
                        }
                    } else {
                        errors.password = 'User does not exist'
                    }
                    resolve({
                        success: false,
                        data: errors
                    })
                })
                .catch(err => {
                    console.log(err);
                    reject()
                    resolve({
                        success: false,
                        data: err
                    })
                })
            })
        } else {
            return {
                success: false,
                data: errors
            }
        }
    }
}