const about = function(req,res){
    res.render('about', {title:'DishDelivery'});
};

module.exports = {
    about
};