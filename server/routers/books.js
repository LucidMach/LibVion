let router = require('express').Router();

const isAuthorised = require('../controllers/isAuthorised');

const { pullBooks, pushBook, pullBookById, updateBook, removeBook } = require('../services/firestore');
const { pullBooksRequest, pullBookRequestById, pushBooksRequest, removeBookRequestById, markBookRequest } = require('../services/firestore');
const { pullUserBooks, pushUserBook, removeUserBook } = require('../services/firestore');






/* User's Book endpoints */

router.get('/me', (req, res) => {
    pullUserBooks(req.user.uid, books => {
        res.json({success: true, books});
    });
});

router.post('/me', (req, res) => {
    const bookId = req.body.bid;    //  id of book
    /** @todo check if book ID is legit */

    pushUserBook(req.user.uid, bookId, ss => {
        // console.log(ss)
        res.json({success: true});
    });
});

router.delete('/me', (req, res) => {
    const bookId = req.body.bid;    //  id of book
    /** @todo check if book ID is legit */

    removeUserBook(req.user.uid, bookId, ss => {
        // console.log(ss)
        res.json({success: true});
    });
});





/* Book Request endpoints */

router.get('/request', (req, res) => {
    /**@todo check if `page` query is number */
    const ignore = req.query.page || 0;

    pullBooksRequest(br => {
        res.json({success: true, data: br});
    }, ignore);
});

router.post('/request', (req, res) => {
    /**@todo check on fields of req.body */
    const { name, author, note } = req.body;

    pushBooksRequest(name, author, req.user.uid, note, ss => {
        // console.log(ss)
        res.json({success: true, id: ss.id});
    });
});

router.get('/request/:id', (req, res) => {
    /**@todo type-checking on `id` parameter */
    const reqId = req.params.id;

    pullBookRequestById(reqId, data => {
        // console.log(data)
        res.json({success: true, data})
    });
});

router.delete('/request/:id', (req, res) => {
    /**@todo type-checking on `id` parameter */
    const reqId = req.params.id;

    removeBookRequestById(reqId, () => {
        res.json({success: true});
    })
});

//  status can only be changed by admins
router.put('/request/:id', isAuthorised, (req, res) => {
    /**@todo type-checking on `id` parameter */
    const reqId = req.params.id;
    const status = req.body.status;

    markBookRequest(reqId, status, data => {
        res.json({success: true, data});
    });
});




/* Books endpoints */

router.get('/', (req, res) => {
    /**@todo check if `page` query is number */
    const ignore = req.query.page || 0;

    pullBooks(books => {
        res.json({success: true, data: books})
    }, ignore);
});

router.get('/:id', (req, res) => {
    /**@todo type-checking on `id` parameter */
    const reqId = req.params.id;
    
    pullBookById(reqId, data => {
        // console.log(data)
        res.json({success: true, data})
    });
});

router.post('/', isAuthorised, (req, res) => {
    /**@todo check on fields of req.body */
    const { name, author, quote } = req.body;

    pushBook(name, author, quote, ss => {
        // console.log(ss)
        res.json({success: true, id: ss.id});
    });
});

router.delete('/:id', isAuthorised, (req, res) => {
    /**@todo type-checking on `id` parameter */
    const bid = req.params.id;

    removeBook(bid, () => {
        res.json({success: true});
    })
});

//  status can only be changed by admins
router.put('/:id', isAuthorised, (req, res) => {
    /**@todo type-checking on `id` parameter */
    const bid = req.params.id;

    updateBook(bid, status, data => {
        res.json({success: true, data});
    });
});





module.exports = router;