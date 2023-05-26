const express = require("express");
const router = express.Router();

const cntrlRestaurant = require("../controllers/restaurant");

router.get("/restaurants",cntrlRestaurant.getRestaurants);
router.post("/restaurants",cntrlRestaurant.createRestaurant);
router.post("/addFood",cntrlRestaurant.addFoodByRestaurants);
router.delete("/deleteFood/:id/:Res_id",cntrlRestaurant.deleteFood);
router.put("/restaurants/:id",cntrlRestaurant.updateRestaurant);
router.delete("/restaurants/:id",cntrlRestaurant.deleteRestaurant);
router.get("/restaurants/:id",cntrlRestaurant.getSingleRestaurant);

module.exports = router;