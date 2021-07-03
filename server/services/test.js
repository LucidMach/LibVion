const { pushBook, pullBooks, pullBookById, updateBook, removeBook } = require('./firestore');
const { pushBooksRequest, pullBooksRequest, pullBookRequestById, removeBookRequestById, markBookRequest } = require('./firestore');
const { pushUserBook, removeUserBook, pullUserBooks, pushUser, removeUser } = require('./firestore');

const id = 'g5MHaKnCyHcpNWkKqIh9';
const name = 'hello world';
const author = 'garbage';
const quote = '';


//* Book collection tests */

// pushBook(name, author, quote, (ss) => {
//     console.log('New Book ID: ', ss.id)
// })


// updateBook(id, name, author, quote, () => {
//     console.log({success: true})
// })


// pullBooks((ss) => {
//     console.log(ss)
// })


// pullBookById('E7DAF1LYexWXHE31i1x7', ss => {
//     console.log(ss)
// })


// removeBook('BBcdRGtZPMjtsAPDSx6B', () => {
//     console.log({success: true})
// })



//* booksRequest collection tests */

// pushBooksRequest(
//     'Story of my life', /* name */
//     'Hellen keller',    /* author */
//     'ancxoe123scx',     /* userId */
//     'this is a novel from my school time', /* note */
//     ss => {
//         console.log('ID of new book request: ', ss.id)
//     }
// )


// pullBooksRequest((ss) => {
//     console.log(ss);
        /* changing status of each book req */
//     // ss.forEach(br => {
//     //     markBookRequest(br.id, true, s => console.log(s));
//     // });
// })


// removeBookRequestById('3Pn8waIhoOw8GwrB2HOE', () => {
//     console.log({success: true})
// })


// pullBookRequestById('JUsk6ovO0LK6bLe9wUTm', ss => {
//     console.log(ss)
// })


// markBookRequest('JUsk6ovO0LK6bLe9wUTm', false, s => console.log(s))



//** users collection test */

// pushUserBook(
//     '123',  /* user ID */
//     'karan', /* book ID */
//     ss => console.log(ss)
// )


// removeUserBook(
//     '123',
//     'karan',
//     ss => console.log(ss)
// )


// pullUserBooks(
//     '123',  /* user ID */
//     ss => console.log(ss)
// )


// pushUser('123', ss => console.log(ss))

// removeUser('123', ss => console.log(ss))