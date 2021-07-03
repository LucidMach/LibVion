const { Firestore } = require('@google-cloud/firestore');
const admin = require('./firebase');
require('dotenv').config();

const serviceAccount = require('../service-account-creds.json');
const projectId = serviceAccount.project_id;
const firestore = new Firestore({projectId});



module.exports = {

    /* books collection */

    //  upload new book to the collection.
    pushBook: (name, author, quote, callback) => {
        firestore.collection('books').add({
            name,
            author,
            quote,
            time: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },

    //  fetch 5 books at a time, orderBy `time` field.
    pullBook: (callback, ignore=0) => {
        firestore.collection('books').offset(parseInt(ignore)*5).limit(5).orderBy('time', 'desc').get()
        .then(ss => {
            let books = []
			ss.forEach(book => {
				books.push({ id: book.id, name: book.data().name, author: book.data().author, quote: book.data().quote });
			});
            callback(books);
        })
        .catch(err => console.log(err.message));
    },

    //  fetch details on perticular book via it's ID
    pullBookById: (id, callback) => {
        firestore.doc(`books/${id}`).get()
        .then(ss => callback(ss.data()))
        .catch(err => console.log(err.message));
    },

    //  update book's properties via it's ID
    updateBook: (id, name, author, quote, callback) => {
        firestore.doc(`books/${id}`).update({
            name,
            author,
            quote
        })
        .then(_ => callback())
        .catch(err => callback(err.message));
    },

    //  remove a book via it's ID from it's collection.
    removeBook: (id, callback) => {
        firestore.doc(`books/${id}`).delete()
        .then(_ => callback())
        .catch(err => console.log(err.message));
    },


    /* booksRequest collection  */

    //  make new book request
    pushBooksRequest: (name, author, user, note, callback) => {
        firestore.collection('booksRequest').add({
            name,
            author,
            time: admin.firestore.FieldValue.serverTimestamp(),
            user,   /* userId */
            note,   /* personal note */
            completed: false,   /* change it to true when req is completed */
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },

    //  fetch 5 book requests at a time, orderBy `time` field.
    pullBooksRequest: (callback, ignore=0) => {
        firestore.collection('booksRequest').offset(parseInt(ignore)*5).limit(5).orderBy('time', 'desc').get()
        .then(ss => {
            let brList = []
            ss.forEach(br => {
                brList.push({ id: br.id, name: br.data().name, author: br.data().author, user: br.data().user, note: br.data().note });
            });
            callback(brList);
        })
        .catch(err => console.log(err.message));
    },

    //  fetch a book request via it's ID from it's collection.
    pullBookRequestById: (id, callback) => {
        firestore.doc(`booksRequest/${id}`).get()
        .then(ss => callback(ss.data()))
        .catch(err => console.log(err.message));
    },

    //  remove a book request via it's ID from it's collection.
    removeBookRequestById: (id, callback) => {
        firestore.doc(`booksRequest/${id}`).delete()
        .then(_ => callback())
        .catch(err => console.log(err.message));
    },

    //  to update `completed` status of request (flag = true/false)
    markBookRequest: (id, flag, callback) => {
        firestore.doc(`booksRequest/${id}`).update({
            completed: flag
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },


    /* users collection */

    //  push new user into firestore
    pushUser: (uid, callback) => {
        firestore.collection('users').doc(uid).set({ books: [] })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },

    //  remove user from firestore
    removeUser: (uid, callback) => {
        firestore.collection('users').doc(uid).delete()
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },

    //  push new book to user books array
    pushUserBook: (uid, bid, callback) => {
        firestore.doc(`users/${uid}`).update({
            books: admin.firestore.FieldValue.arrayUnion(bid)
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    },

    //  get all books of user
    pullUserBooks: (uid, callback) => {
        firestore.doc(`users/${uid}`).get('books')
        .then(ss => callback(ss.data().books))
        .catch(err => console.log(err.message));
    },

    //  remove particular book by `bookID` of user of `uid`
    removeUserBook: (uid, bid, callback) => {
        firestore.doc(`users/${uid}`).update({
            books: admin.firestore.FieldValue.arrayRemove(bid)
        })
        .then(ss => callback(ss))
        .catch(err => console.log(err.message));
    }
}