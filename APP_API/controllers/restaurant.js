const mongoose = require("mongoose");
const restaurantModel = mongoose.model("restaurant");


const getRestaurants = function (req, res) {

    restaurantModel.find().exec(function (err, result) {
        if (err) {
            res.status(404).json(err);
            return;
        }

        res.status(200).json(result);
    });
    //res.status(200).json({"status":"success."})
};

const createRestaurant = function (req, res) {
    //res.status(200).json({"status":"success"})
    restaurantModel.create({
        restaurantsName: req.body.restaurantsName,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        rating: req.body.rating,
        phoneNumber: req.body.phoneNumber,
        imagePath: req.body.imagePath,
        specialFood: [ ]
    }
        , (err, result) => {
            console.log(err)
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(201).json(result);
            }
        });
};

const getSingleRestaurant = function (req, res) {
    restaurantModel.findById(req.params.id)
        .exec((err, result) => {
            if (!result) {
                return res.status(404).json({ "message": "Restaurant not found" });
            }
            else if (err) {
                return res.status(404).json(err);
            }

            res.status(200).json(result);
        });

    //res.status(200).json({"status":"success"})
};

const updateRestaurant = function (req, res) {
    if (!req.params.id) {
        res.status(400).json({ "message": "Not found, id is required." });
        return;
    }

    restaurantModel.findById(req.params.id)
        .exec((err, result) => {
            if (!result) {
                res.status(404).json({ "message": "Restaurant not found" });
                return;
            }
            else if (err) {
                res.status(404).json(err);
                return;
            }

           
            result.restaurantsName = req.body.restaurantsName,
                result.address = req.body.address,
                result.city = req.body.city,
                result.province = req.body.province,
                result.postalCode = req.body.postalCode,
                result.rating = req.body.rating,
                result.phoneNumber = req.body.phoneNumber,
                result.imagePath = req.body.imagePath,
               
                result.save((err, restVal) => {

                    if (err) {
                        res.status(404).json(err);
                    }
                    else {
                        res.status(200).json(restVal);
                    }
                });
            
        });

    //res.status(200).json({"status":"success"})
};



const addFoodByRestaurants = function (req, res) {

    if (!req.body._id) {
        res.status(400).json({ "message": "Not found, id is required." });
        return;
    }

    restaurantModel.findOneAndUpdate({ _id: req.body._id }, { $push: { specialFood: req.body.specialFood } }, (err, doc) => {
        // do something here
        
        if (err) {
            res.status(404).json(err);
        }
        else {
            res.status(200).json(doc);
        }

    });

};

const deleteRestaurant = function (req, res) {
    const id = req.params.id;
    if (id) {
        restaurantModel.findByIdAndRemove(id)
            .exec((err, result) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }
                res.status(204).json(null);
            });
    }
    else {
        res.status(404).json({ "message": " No id found" })
    }
    //res.status(200).json({"status":"success"})
};


const deleteFood = function (req, res) {
    const id = req.params.id;
    const Res_id = req.params.Res_id;
    console.log(id)
    if (id && Res_id) {
        restaurantModel.findById(Res_id, function (err, result) {
            //console.log(result.specialFood.id(id));
            if (err) {
                    res.status(404).json(err);
                    return;
                }
            
            result.specialFood.id(id).remove();
            result.save();       
            res.status(204).json(null);     
        });
        // restaurantModel.findByIdAndRemove(id)
        //     .exec((err, result) => {
        //         if (err) {
        //             res.status(404).json(err);
        //             return;
        //         }
        //         res.status(204).json(null);
        //     });
    }
    else {
        res.status(404).json({ "message": " No id found" })
    }
    //res.status(200).json({"status":"success"})
};


module.exports = {
    getRestaurants,
    createRestaurant,
    getSingleRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addFoodByRestaurants,
    deleteFood
}