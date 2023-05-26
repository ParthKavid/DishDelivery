const request = require("request");

const apiOptions = {
    server: 'http://localhost:3000'
}; 


const restaurants = function(req,res){
    const path = '/api/restaurants';
    const requestOption = {
        url:apiOptions.server + path,
        method:'GET',
        json:{}
    };

    request(requestOption,(err,response,body)=>{
        _renderHomepage(req,res,body);
    });
};

const _renderHomepage = function(req,res,responseBody){
   
    res.render('list-display',{restaurants:responseBody});
};

const _renderDetailPage = function(req,res,responseBody){
    res.render('details',{
        currentRestaurant:responseBody
    });
};

const restaurantInfo = function(req,res){
    const path = `/api/restaurants/${req.params.id}`;
    const requestOption = {
        url : apiOptions.server + path,
        method:'GET',
        json:{}
    };
    request(requestOption,(err,response,body)=>{
        
        _renderDetailPage(req, res,body);
    });
};

const _renderCreatePage = function(req,res){
    res.render('create',{
        title:"Add New Restaurant",
        errorMsg: req.query.err
    });
};

const addNewRestaurant = function(req,res){
    _renderCreatePage(req,res);
}

const doAddNewRestaurant = function(req,res){
    
    if(req.body.restaurantsName == "" || req.body.address== ""|| req.body.phoneNumber== ""){
        res.render("create",{
            title:"Add New Restaurant",
            errorMsg : "val",
        });
        return;
    }

    const path = '/api/restaurants';
    const postdata = {
        restaurantsName: req.body.restaurantsName,
        address: req.body.address,
        city: req.body.city,
        province : req.body.province,
        postalCode: req.body.postalCode,
        rating : req.body.rating,
        phoneNumber:req.body.phoneNumber,
        imagePath:req.body.imagePath,
        specialFood: [
            
        ]
    };

    const requestOptions = {
      url:apiOptions.server+path,
      method:'POST',
      json:postdata  
    };

    request(requestOptions,
        (err,response,body) => {
            if(response.statusCode === 201){
                res.redirect('/');
            }
        });
};

var arrResturantsList = [];

const restaurantsList = function(req,res){
    const path = '/api/restaurants';
    const requestOption = {
        url:apiOptions.server + path,
        method:'GET',
        json:{}
    };

    request(requestOption,(err,response,body)=>{
        //_renderHomepage(req,res,body);
        arrResturantsList =[];
        for (let val in body) {
            arrResturantsList.push({"name" : body[val].restaurantsName, "value" : body[val]._id});
        } 

        res.render("addFoodByRestaurants",{
            title:"Add Food",
            errorMsg : req.query.err,
            resutaurantsList: arrResturantsList
        });
        
    });

    return arrResturantsList;
};

const _renderCreateFoodPage =  function(req,res){
   restaurantsList(req,res);
};

const addNewFood = function(req,res){
    _renderCreateFoodPage(req,res);
};



const doAddNewFood = function(req,res){

    if(req.body.name == "" || req.body.price== ""){
        res.render("addFoodByRestaurants",{
            title:"Add Food",
            errorMsg : "val",//"Error : All fields are required",
            resutaurantsList: arrResturantsList
        });
        return;
    }

   const path = `/api/addFood`;
    const postdata = {
        id : req.body.restaurantsNameID,
        specialFood: [
            {
                name : req.body.name,
                price : "$"+req.body.price
            }
        ]
    };

    const requestOptions = {
      url:apiOptions.server+path,
      method:'PUT',
      json:postdata  
    };

    request(requestOptions,
        (err,response,body) => {
            if(response.statusCode === 200){
                res.render("addFoodByRestaurants",{
                    title:"Add Food",
                    errorMsg : "success",
                    resutaurantsList: arrResturantsList
                });
                //res.redirect('/addFood');
            }
        });
};
// var restaurants = [
//     {name:"Royal Taste", phone: "555-555-5555", rating:"4", address:"10990 Chinguacousy Rd, Brampton, ON L7A 0P1",url:"./images/royal-taste-sweets-and-restaurant.jpg"
//     , specialFood:[
//         {name : "Pavbhaji", price: "$7.99"},
//         {name : "Veg Thali", price: "$9.99"},
//         {name : "Chole Bhature", price: "$5.99"}
//         ]}
//     ,{name:"Paranthe Wali Gali", phone: "564-123-3212", rating:"3", address:"2452 Queen St E, Brampton, ON L6S 5X9",url:"./images/parathe-wali-gali.jpg"
//     , specialFood:[
//         {name : "Lacha Parantha", price: "$4.99"},
//         {name : "Lamb Kemma Parantha", price: "$19.99"},
//         {name : "Veg Biryani", price: "$15.99"}
//         ]
//     }
//     ,{name:"Harvey's", phone: "452-544-1212", rating:"2", address:"10900 Hurontario St, Brampton, ON L7A 3R9",url:'./images/MAIN-harveys.jpg'
//     , specialFood:[
//         {name : "Poutines", price: "$8.99"},
//         {name : "Burger", price: "$10.99"},
//         {name : "Wraps", price: "$3.99"}
//         ]
//     }
//     ,{name:"Rajdhani Indian Sweets & Restaurant", phone: "452-354-6699", rating:"4", address:"2280 Bovaird Dr E Unit#106, Brampton, ON L6R 1Z1",url:'./images/rajdhani.webp'
//     , specialFood:[
//         {name : "Chana Masala", price: "$4.99"},
//         {name : "Shahi Paneer", price: "$9.99"},
//         {name : "Gulab Jamun", price: "$2.99"}
//         ]    
//     }
// ];


// const list_display = function(req,res){
//     res.render('list-display', {restaurants:restaurants});
// };




module.exports = {
    restaurants,
    restaurantInfo,
    addNewRestaurant,
    doAddNewRestaurant,
    addNewFood,
    doAddNewFood
    //list_display
};