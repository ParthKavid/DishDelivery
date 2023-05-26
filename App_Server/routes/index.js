var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DishDelivery' });
});

const cntrlAbout =require("../controllers/about"); 
router.get('/about',cntrlAbout.about );

 const cntrlListDisplay =require("../controllers/list-display"); 
 router.get('/list',cntrlListDisplay.restaurants);
 router.get('/list/:id',cntrlListDisplay.restaurantInfo);

router.route('/new')
    .get(cntrlListDisplay.addNewRestaurant)
    .post(cntrlListDisplay.doAddNewRestaurant);

router.route('/addFood')
    .get(cntrlListDisplay.addNewFood)
    .post(cntrlListDisplay.doAddNewFood);

module.exports = router;
