var mongoose = require('mongoose');

const specialFoodSchema = new mongoose.Schema({
    _id:{type:String},
    name : {type : String},
    price : {type : String}
}); 

var restaurantsSchema = new mongoose.Schema({
    
    restaurantsName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {type:String},
    province : {type: String},
    postalCode:{type:String},
    rating : {
        type: Number,
        min:0,
        max:5,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    imagePath:{
        type: String,
        required:false,
        'default':"../images/NoImage.jpg"
    },
    specialFood: [specialFoodSchema]
   });

   mongoose.model('restaurant', restaurantsSchema);
