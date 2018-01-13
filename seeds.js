var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        price:"125",
        image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Blandit turpis cursus in hac habitasse platea dictumst quisque. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tortor consequat id porta nibh venenatis. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Enim eu turpis egestas pretium. Commodo elit at imperdiet dui accumsan. Semper feugiat nibh sed pulvinar. Eros donec ac odio tempor. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Eu volutpat odio facilisis mauris. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Sit amet nisl purus in mollis nunc sed id semper. Arcu dui vivamus arcu felis bibendum ut. Faucibus ornare suspendisse sed nisi lacus sed viverra. Cursus euismod quis viverra nibh cras pulvinar.",
        location: "Miami Beach, FL"
        
    }, 
    {
        name: "Beverly Mesa",
        price:"500",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Blandit turpis cursus in hac habitasse platea dictumst quisque. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tortor consequat id porta nibh venenatis. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Enim eu turpis egestas pretium. Commodo elit at imperdiet dui accumsan. Semper feugiat nibh sed pulvinar. Eros donec ac odio tempor. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Eu volutpat odio facilisis mauris. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Sit amet nisl purus in mollis nunc sed id semper. Arcu dui vivamus arcu felis bibendum ut. Faucibus ornare suspendisse sed nisi lacus sed viverra. Cursus euismod quis viverra nibh cras pulvinar.",
        location: "Beverly Hills, CA"
    },
    {
         name: "Sunset Mountain",
         price:"250",
         image: "https://www.nps.gov/bicy/planyourvisit/images/DSC00856_1.JPG", 
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Blandit turpis cursus in hac habitasse platea dictumst quisque. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tortor consequat id porta nibh venenatis. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Enim eu turpis egestas pretium. Commodo elit at imperdiet dui accumsan. Semper feugiat nibh sed pulvinar. Eros donec ac odio tempor. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Eu volutpat odio facilisis mauris. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Sit amet nisl purus in mollis nunc sed id semper. Arcu dui vivamus arcu felis bibendum ut. Faucibus ornare suspendisse sed nisi lacus sed viverra. Cursus euismod quis viverra nibh cras pulvinar.",
         location: "Houston, TX"
    },
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
      if(err){
          console.log(err)
      }
      console.log("Removed campgrounds.")
      //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground.")
                    //create a comment
                    Comment.create({
                      text: "This place is heaven on earth!!", 
                      author: "Homer Simpson"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment.")
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;