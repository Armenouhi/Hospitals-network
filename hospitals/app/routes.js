// app/routes.js

// load the todo model
var express=require('express');
var router=express.Router();
var multer = require('multer');
var uploadCentres = multer({dest:'images/centres'});
var Centre = require('./models/centre');
var fs = require('fs');
// ========  expose the routes to our app with module.exports =========================
module.exports = function(app) {

    app.set('view engine','ejs');

//     // ====================    RESTfull API ======================================================

//     // // delete a todo
//     // app.delete('/api/todos/:todo_id', function(req, res) {
//     //     Todo.deleteOne({
//     //         _id : req.params.todo_id
//     //     }, function(err, todo) {
//     //         if (err)
//     //             res.send(err);
//     //
//     //         // get and return all the todos after you create another
//     //         Todo.find(function(err, todos) {
//     //             if (err)
//     //                 res.send(err)
//     //             res.json(todos);
//     //         });
//     //     });
//     // });
//     //





    /**
     * Centres
     */


    app.post('/api/centres',uploadCentres.any(),function(req, res,next) {

        if(req.files){
            req.files.forEach(function(file){
                console.log(file);
                var filename=(new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/centres/' + file.originalname ,function(err){
                    if(err)throw err;
                    var centre = new Centre({
                        centreName:req.body.name,
                        centreOwnerName:req.body.owner,
                        centreEmail:req.body.email,
                        centreOwnerEmail:req.body.ownerEmail,
                        centrePassword:req.body.password,
                        centreAddress:req.body.address,
                        centrePphone:req.body.phone,
                        centreOwnerPphone:req.body.ownerPhone,
                        image:file.originalname
                    })
                   centre.save(function (err,result) {
                        if (err) {

                        }
                        res.json(result);

                    });

                });
            });
        }

    });


    app.post('/clinic', function(req, res,next) {
        // console.log("centres",req.body);
        console.log("email",req.body.email);
        console.log("password",req.body.password);

        var errD = {};
        errD.success = true;
        errD.href = "";
        errD.data = "";

        Centre.find(function(err, centeres) {
            if (err)

                console.log("Error 2");

                for (var key = 0; key < centeres.length; key++) {

                    if (req.body.email ==  centeres[key].centreEmail && req.body.password ==  centeres[key].centrePassword)  {
                        console.log(centeres[key].centreEmail + " " + centeres[key].centrePassword);
                        errD.success = true;
                        errD.href = `${centeres[key]._id}`;
                        errD.data = centeres;
                        errD.message = "";
                        break;
                    } else {
                        console.log("Email or password incorrectly!");
                        errD.success = false;
                        errD.href = "";
                        errD.data = centeres;
                        errD.message = "Email or password incorrectly!";
                    }
                }
            res.json(errD);
        });

    });


    app.get('/find_centers', function (req, res) {
            Centre.find(function(err, centeres) {
                if (err)
                // res.send(err)
                    console.log("Error 2");
               res.json(centeres);
            });
    })
    
    
    app.post('/login', function (req, res) {
        // console.log(req.body)
        var data = {}
        Centre.find( function(err, centeres) {
            if (err)
            // res.send(err)

                console.log(centeres);

            for (var key = 0; key < centeres.length; key++) {

                if (req.body.username ==  centeres[key].centreEmail && req.body.password ==  centeres[key].centrePassword)  {
                    // console.log(centeres[key].centreEmail + " " + centeres[key].centrePassword);
                    // data.id = centeres[key]._id;
                    // data.email = req.body.username;
                    // data.password = req.body.password;
                    // data.message = "Save successfully!"
                    res.render("/director");
                } else {
                    // data.id = "";
                    // data.email = "";
                    // data.password = "";
                    // data.message = "Email or password incorrectly!"
                    console.log("Email or password incorrectly!");
                }

                console.log(centeres[key]);
            }

            res.json(data);
        });
    })



    app.post('/logout', function (req, res) {
        console.log(req.body);
        // res.redirect("/");
        res.render("/");
    })
};
