const { pushBook, pullBooks, pullBookById, updateBook, removeBook } = require('./firestore');



const id = 'g5MHaKnCyHcpNWkKqIh9';
const name = 'hello world';
const author = 'freakin Dev';
const quote = 'world is all about hello.';

// pushBook(name, author, quote, (ss) => {
//     console.log('New Book ID: ', ss.id);
// });


// updateBook(id, name, author, quote, () => {
//     console.log({success: true});
// })


// pullBooks((ss) => {
//     console.log(ss);
// });


pullBookById('E7DAF1LYexWXHE31i1x7', ss => {
    console.log(ss);
})


// removeBook('BBcdRGtZPMjtsAPDSx6B', () => {
//     console.log({success: true});
// });



