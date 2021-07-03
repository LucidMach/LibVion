const { Firestore } = require('@google-cloud/firestore');
const admin = require('./firebase');
require('dotenv').config();

const serviceAccount = require('../service-account-creds.json');
const projectId = serviceAccount.project_id;
const firestore = new Firestore({projectId});



module.exports = {

    /* Books collection */

    //  upload new book to the collection.
    pushBook: (name, author, quote, callback) => {
        firestore.collection('books').add({
            name,
            author,
            quote,
            time: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err));
    },

    //  fetch 5 books at a time, orderBy `time` field.
    pullBooks: (callback, ignore=0) => {
        firestore.collection('books').offset(parseInt(ignore)*5).limit(5).orderBy('time').get()
        .then(ss => {
            let books = []
			ss.forEach(book => {
				books.push({ id: book.id, name: book.data().name, author: book.data().author, quote: book.data().quote });
			});
            callback(books);
        })
        .catch(err => console.log(err));
    },

    //  fetch details on perticular book via it's ID
    pullBookById: (id, callback) => {
        firestore.doc(`books/${id}`).get()
        .then(ss => callback(ss.data()))
        .catch(err => console.log(err));
    },

    //  update book's properties via it's ID
    updateBook: (id, name, author, quote, callback) => {
        firestore.doc(`books/${id}`).update({
            name,
            author,
            quote
        })
        .then(_ => callback())
        .catch(err => callback(err));
    },

    //  remove a book via it's ID from it's collection.
    removeBook: (id, callback) => {
        firestore.doc(`books/${id}`).delete()
        .then(_ => callback())
        .catch(err => console.log(err));
    }
}