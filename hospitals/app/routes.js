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

        // console.log(req.body);

        var Errors = {};
        Errors.success = true;

        var reg = /[^A-Za-z ]/;
        var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        // var reg_owEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var regadd = /^[a-zA-Z0-9. ]/;
        var regtell =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g

            if (req.body.name == undefined) {
                Errors.name_error = "Please enter clinic's name";
                Errors.success = false;
            }
            else {
                if (req.body.name.match(reg)) {
                    Errors.name_error = "Please, enter only letters and space";
                    Errors.success = false;
                }
            }

            if (req.body.owner == undefined) {
                Errors.owner_error = "Please enter Your name";
                Errors.success = false;
            }
            else {
                if (req.body.owner.match(reg)) {
                    Errors.owner_error = "Please, enter only letters and space";
                    Errors.success = false;
                }
            }

            if (req.body.email == undefined){
                Errors.email_error = "Please enter Your email";
                Errors.success = false;
            } else {
        
                if (!req.body.email.match(regEmail)) {
                    Errors.email_error = "Please, enter only @ and .com or .ru";
                    Errors.success = false;
                }  
                else {

                    var e = {}

                    Centre.find(function(err, centeres) {
                        if (err)
                            console.log(centeres);

                        for (var mail in centeres) {
                            // console.log(centeres[mail]);

                            if(req.body.email == centeres[mail].centreEmail) {
                                console.log("Email already exists");
                                Errors.email_error = "Email already exists";
                                Errors.success = false;

                                //return(e);
                            } 
                        }
                        console.log(e, "eee")
                                                        
                    });
                    

                    

                            
                }
            }

            if (req.body.ownerEmail == undefined){
                Errors.ownerEmail_error = "Please enter Your email";
                Errors.success = false;
            } else {
        
                if (!req.body.ownerEmail.match(regEmail)) {
                    Errors.ownerEmail_error = "Please, enter only @ and .com or .ru";
                    Errors.success = false;
                }
            }

            if (req.body.password == undefined){
                Errors.pass_error = "Please enter Your password";
                Errors.success = false;
            } 

            if (req.body.address == undefined){
                Errors.address_error = "Please enter clinic's address";
                Errors.success = false;
            } else {
        
                if (!req.body.address.match(regadd)) {
                    Errors.address_error = "Please, enter letters, numbers, . and space";
                    Errors.success = false;
                }
            }

            if (req.body.phone == undefined){
                Errors.phone_error = "Please enter Your tell";
                Errors.success = false;
            } else {
        
                if (!req.body.phone.match(regtell) || (req.body.phone.length < 9  || req.body.phone.length > 19)) {
                    Errors.phone_error = "For example +(374) 000 00-00-00 or 000 000000";
                    Errors.success = false;
                }
            }


            if (req.body.ownerPhone == undefined){
                Errors.ownerPhone_error = "Please enter clinic's tell";
                Errors.success = false;
            } else {
        
                if (!req.body.ownerPhone.match(regtell) || (req.body.phone.length < 9  || req.body.phone.length > 19)) {
                    Errors.ownerPhone_error = "For example +(374) 000 00-00-00 or 000 000000";
                    Errors.success = false;
                }
            }

            if (Errors.success == false)  {
                console.log(Errors);
                res.send(Errors);
            } else  {

                Errors.success;

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
                                 res.send(result);
                                console.log(result);

                            });

                        });
                    });
                 } else {
                    console.log("Please enter only image");
                 }

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



     app.post('/checkEmail', function(req, res,next) {
       // console.log("email",req.body.email);

       var errEmail= {};
       errEmail.success = true;
       errEmail.id = "";

       Centre.find(function(err, centeres) {
           if (err)

           errEmail.success = false;
           errEmail.id = "";
           errEmail.message = "OOPS!";

           for (var key = 0; key < centeres.length; key++) {

               if (req.body.email ==  centeres[key].centreEmail || req.body.email ==  centeres[key].centrePphone)  {
                   console.log(centeres[key].centreEmail);
                   errEmail.success = true;
                   errEmail.id = `${centeres[key]._id}`;
                   errEmail.message = "";
                   break;
               } else {
                
                   errEmail.success = false;
                   errEmail.id = "";
                   errEmail.message = "Incorrectly Email or phone!";
               }
           }
           res.json(errEmail);
       });

   });



   app.post('/newPassword', function(req, res,next) {
       console.log("pass",req.body.newPass);
       console.log("e",req.body.e);

       var errPass= {};
       errPass.success = true;
       errPass.message = "";


            if (req.body.newPass == undefined){
                errPass.message = "Please enter Your password";
                errPass.success = false;
                res.json(errPass);
            } else {

                  Centre.findOne({
                    $or:[
                        {centreEmail: req.body.e}, 
                        {centrePphone: req.body.e}
                        ]
                    },  function(err, centere) {
                    if (err) console.log("Error");
                    
                     centere.centrePassword = req.body.newPass;
                        centere.save(function (err,result) {
                           if (err) {
                               errPass.success = false;
                               errPass.message = "Sorry password did not change!";
                           }  else  {
                               errPass.success = true;
                               errPass.message = "Your password changed!";
                           }
                           res.json(errPass);

                        });

           
                  });

            }


   });



   app.post('/changeImg', uploadCentres.any(), function(req, res,next) {
                console.log(req.body);

                errImg = {};
                errImg.success = true;
                errImg.message = "";

                if(req.files){
                    req.files.forEach(function(file){
                    console.log(file);
                        var filename=(new Date).valueOf() + "_" + file.originalname
                            fs.rename(file.path, 'public/images/centres/' + file.originalname ,function(err){
                             if(err)console.log("image_error");

                             Centre.findOne({_id: req.body.id },function(err, centere) {
                                if (err) console.log("Error");

                                 centere.image = file.originalname;
                                    centere.save(function (err,result) {
                                       if (err) {
                                           errImg.success = false;
                                           errImg.message = "Sorry IMAGE does not change!";
                                           

                                       }  else  {
                                            console.log("OK");
                                           errImg.success = true;
                                           errImg.message = "Your IMAGE changed!";
                                       }
                                        res.json(errImg);

                                    });

           
                                });
                

                         });
                    });
                 } else {
                    console.log("Please enter only image");
                 }
        

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



