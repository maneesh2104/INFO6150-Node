const Doctors = require('../models/Doctor')
const User = require('../models/User')

module.exports = (app) => {

    app.get('/doctor/getAll', function(req, res) {
        Doctors.find(function(err, users) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.status(200);
            res.json(users);
        });
    });

    app.put('/doctor/edit', function(req, res) {
        var regexEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexpassw = /^[A-Za-z]\w{7,14}$/;
        
        
        let old_email = req.body.old_email;
        let old_password = req.body.old_password;
        let new_email = req.body.new_email;
        let new_password = req.body.new_password;
        if ( !new_email.trim().match( regexEmail ) )
        {
            res.status(400);
            res.json({"message":"Email not valid"});
        }

        else if(!new_password.trim().match( regexpassw ) ){
            res.status(400);
            res.json({"message":"Password not valid, should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        }
        else{
            Doctors.findOneAndUpdate({email: old_email, password:old_password },
                {$set:{email: new_email, password: new_password}},
                 {new: true}, (err, doc) => {
                   console.log(doc);
                   if (err) {
                       res.json({"message":"Error in updating"});
                       console.log("Something wrong when updating data!");
                   }
                   
                   if(doc==null){
                       res.status(400);
                       res.json({"message":"No match found"});
                   }
                   else{
                       res.send(doc);
                   }
           });
        }
        

    });

    app.post('/doctor/delete', function(req, res) {
        Doctors.findOne(req.body, function(err,obj) {
             if(obj==null){
                res.status(400);
                res.json({"message":"Record not found"});
             }
             else{
                Doctors.deleteOne(req.body, function (err) {
                    console.log(err);
                    if(err) res.send(err);
                    console.log("Successful deletion");
                    res.status(200);
                    res.json({"message":"Sucessfully deleted"});
                  });
             }
            });        
    });

    

    app.post('/doctor/create', function(req, res) {

        var regexEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexpassw = /^[A-Za-z]\w{7,14}$/;
        var email = req.body.email;
        var password = req.body.password;

        if ( !email.trim().match( regexEmail ) )
        {
            res.status(400);
            res.json({"message":"Email not valid"});
        }

        else if(!password.trim().match( regexpassw ) ){
            res.status(400);
            res.json({"message":"Password not valid, should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        }

        else{
            var rec = new Doctors(req.body);
            rec.save(function(err, n) {
                if (err)
                    console.log('saving failed');
                console.log('saved ' + n.email);
                res.status(201)
                res.json(n);
            });
        }

    });

    app.post('/user/signin', function(req, res) {
        User.findOne(req.body, function(err,obj) {
             if(obj==null){
                res.status(400);
                res.json({"message":"Record not found"});
             }
             else{
                 console.log(obj);
                res.status(200);
                res.json({"message":"Sucessfully logged in"});
             }
            });        
    });

    app.post('/user/signup', function(req, res) {

        var regexEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexpassw = /^[A-Za-z]\w{7,14}$/;
        var email = req.body.email;
        var password = req.body.password;

        if ( !email.trim().match( regexEmail ) )
        {
            res.status(400);
            res.json({"message":"Email not valid"});
        }

        else if(!password.trim().match( regexpassw ) ){
            res.status(400);
            res.json({"message":"Password not valid, should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        }

        else{
            var rec = new User(req.body);
            rec.save(function(err, n) {
                if (err)
                    console.log('saving failed');
                console.log('saved ' + n.email);
                res.status(201)
                res.json(n);
            });
        }

    });
}