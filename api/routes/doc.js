const paginate = require('jw-paginate');

const express = require('express');
const router = express.Router();


const doc = require('../model/doc');


//////////////////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'api/uploads/');
        cb(null, "client/public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});


{/*----------------------------------------------------------------------*/}



router.get('/get/all/paginate', (req,res) => {
    doc.find().then(items => {

        const page = parseInt(req.query.page) || 1;

        // get size of items that should display
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);

        // get the page number from item list
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pagination related data and items in the selected page
        return res.json({ pager, pageOfItems });

    });


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*({
    product_name: new RegExp(req.query.sitem, 'i')
})*/
/*
({
    "$or": [
        { name: { '$regex': query, '$options': 'i' } },
        { ref: { '$regex': query, '$options': 'i' } }
    ]
})

*/

router.get('/get/all/paginate/search', (req,res) => {
    doc.find({
        "$or": [
            { docName: { '$regex': req.query.sitem, '$options': 'i' } },
            { specialization: { '$regex': req.query.sitem, '$options': 'i' } }
        ]

          }).then(items => {

        const page = parseInt(req.query.page) || 1;

        // get size of items that should display
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);

        // get the page number from item list
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pagination related data and items in the selected page
        return res.json({ pager, pageOfItems });

    });


});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.route("/add").post(
    upload.single("imageData"),
    (req, res, next) => {
        console.log(req.body);
        const newDoc = new doc({
            imageName: req.body.imageName,
            // imageData: req.file.path,
            imageData: req.file.path.substr(22),
            docUn: req.body.docUn,
            docName: req.body.docName,
            channelFee: req.body.channelFee,
            specialization: req.body.specialization,
            hospital: req.body.hospital,
            channelDays: req.body.channelDays,
            time: req.body.time,
        });

        newDoc
            .save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result,
                });
            })
            .catch((err) => next(err));
    }
);



/////////////////////////////////////////////////////////////////////////////////////////////////////////////




router.route('/delete/:id').get(function(req, res){
    doc.findByIdAndRemove({_id:req.params.id}, function(err, business){
        if(err)res.json(err);
        else res.json('Successfully removed');
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.route("/get").get(function (req, res) {
    doc.find(function (err, product) {
        if (err) console.log(err);
        else {
            res.json(product);
        }
    });
});


module.exports = router;