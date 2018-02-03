var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//===========
// Root Route
//===========
router.get("/", function(req, res){
   res.render("landing"); 
});


// Show register form
router.get("/register", function(req, res){
   res.render("register", {page: "register"}); 
});

// Handles signup logic
router.post("/register", function(req, res){
    // var newUser = new User({username: req.body.username});
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
    });

    if(req.body.admincode === "amos1234"){
        newUser.isAdmin = true;
    }
    
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        //   req.flash("error", err.message);
          return res.render("register", {"error": err.message});
      }
      passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
          res.redirect("/campgrounds");
      });
  });
});

// Show login form
router.get("/login", function(req, res){
   res.render("login", {page: "login"}); 
});

// Handles login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
})

//  User Profiles
router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err || !foundUser){
           req.flash("error", err.message);
           return res.redirect("/");
       } 
       Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
           if(err){
               req.flash("error", err.message);
               res.redirect("/");
           } 
           res.render("users/show", {user: foundUser, campgrounds: campgrounds});
       });
   }); 
});

// // User Profile Edit Route

// router.get("/users/:id/edit", function(req, res){
//     User.findById(req.params.id, function(err, foundUser){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("/");
//         } else {
//             res.render("users/edit", {user: foundUser});
//         }
//     })

// });

// // User Profile Update Route

// router.put("/users/:id", function(req, res){
//     User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("/");
//         } else {
//             req.flash("success", "Successfully Updated Profile!")
//             res.redirect("/users/" + req.params.id)
//         }
//     })
// })

module.exports = router;