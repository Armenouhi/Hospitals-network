// app/routes.js

// load the todo model
var express=require('express');
var router=express.Router();
var multer = require('multer');
var uploadCentres = multer({dest:'images/centres'});
var uploadExperts = multer({dest:'images/experts'});
var uploadPatients = multer({dest:'images/patients'});
var Centre = require('./models/centre');
var Expert = require('./models/expert');
var Patient = require('./models/patient');
var fs = require('fs');
var ObjectId = require("objectid");
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

        Centre.find(function(err, centeres) {
            if (err)

                console.log("Error 2");

                for (var key = 0; key < centeres.length; key++) {

                    if (req.body.email ==  centeres[key].centreEmail && req.body.password ==  centeres[key].centrePassword)  {
                        console.log(centeres[key].centreEmail + " " + centeres[key].centrePassword);
                        errD.success = true;
                        errD.href = `${centeres[key]._id}`;
                        errD.message = "";
                        break;
                    } else {
                        console.log("Email or password incorrectly!");
                        errD.success = false;
                        errD.href = "";
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



    app.get('/centres/:id', function(req, res, next) {
        Centre.findById(req.params.id,function (err, data) {

            if (err)
                console.log("Data does not found!");

            res.json(data); 
             next();

        });

    });
    
    



    /**
    * Expert
    **/


app.post('/api/experts',uploadExperts.any(),function(req, res,next) {

    console.log(req.body);
    console.log(req.files);

        if(req.files){
            req.files.forEach(function(file){
                console.log(file);
                var filename=(new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/experts/' + file.originalname ,function(err){
                    if(err)throw err;
                    var expert = new Expert({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        username:req.body.username,
                        password:req.body.password,
                        workPlace:req.body.workPlace,
                        phone:req.body.phone,
                        proffession:req.body.proffession,
                        cell:req.body.cell,
                         address:req.body.address,
                        centre:req.body.centre,
                        image:file.originalname
                    })
                   expert.save(function (err,result) {
                        if (err) {
                            console.log("Data does not save!")
                        }
                        console.log("It's OK!")
                        res.json(result);

                    });

                });
            });
        }

    });


    app.get('/find_experts', function (req, res) {
            Expert.find(function(err, experts) {
                if (err)
                // res.send(err)
                    console.log("Error 2");
               res.json(experts);
            });
    })




    /**
    * Patient
    **/


app.post('/api/patients',uploadPatients.any(),function(req, res,next) {

    console.log(req.body);
    console.log(req.files);

        if(req.files){
            req.files.forEach(function(file){
                console.log(file);
                var filename=(new Date).valueOf() + "_" + file.originalname
                fs.rename(file.path, 'public/images/patients/' + file.originalname ,function(err){
                    if(err)throw err;
                    var patient = new Patient({
                        fullname:req.body.fullname,
                        phone:req.body.phone,
                        username:req.body.username,
                        expert:req.body.expert,
                        password:req.body.password,
                        animals:req.body.animals,
                        address:req.body.address,
                        count:req.body.count,
                        image:file.originalname
                    })
                   patient.save(function (err,result) {
                        if (err) {
                            console.log("Data does not save!")
                        }
                        console.log("It's OK!")
                        res.json(result);

                    });

                });
            });
        }

    });




    app.get('/find_patients', function (req, res) {
            Patient.find(function(err, patients) {
                if (err)
                // res.send(err)
                    console.log("Error 2");
               res.json(patients);
            });
    })




};



