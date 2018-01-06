// All middleware
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj ={};

// Campground Authorizaiton middleware
middlewareObj.checkCampgroundOwnership = function (req, res, next){
     // Is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // Does user own the campground?
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    // Otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                   res.redirect("back")
                }
            }
        });
    } else {
        // Redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


// Comment Authorizaiton middleware
middlewareObj.checkCommentOwnership = function (req, res, next){
     // Is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    // Otherwise, redirect
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back")
                }
            }
        });
    } else {
        // Redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


// Logged In Middleware
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj