import { Component, OnInit,Input } from '@angular/core';
import { Restaurant, specialFoodSchema } from '../restaurant';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

constructor(private restaurantService: RestaurantServiceService) { }

  public specialFoodData: specialFoodSchema = {
    _id:'',
    name: '',
    price: ''
  }

  
  public newRestaurant: Restaurant = {
    _id: '',
    restaurantsName: '',
    address: '',
    city: '',
    imagePath: '../images/NoImage.jpg',
    phoneNumber: '',
    postalCode: '',
    province: '',
    rating: 5,
    specialFood: [this.specialFoodData]
  }
  restaurants :  Restaurant[];

  ngOnInit(): void {
    this.restaurantService
      .getRestaurants()
      .then((restaurant: Restaurant[])=>{
        this.restaurants = restaurant.map(restaurant =>{
          
          return restaurant;
        });
      });
  }
  



  public formVisible: boolean = false;

  public errorMsg = "";

  private formIsValid(): boolean {
    if (this.newRestaurant.specialFood[0]['name'] && this.newRestaurant.specialFood[0]['price']) {
      return true;
    } else {
      return false;
    }
  }

  public onSubmitFood(): void {
    this.errorMsg = '';
    
    if (this.formIsValid()) {
      var rdmId = (Math.random() + 1).toString(36).substring(7);
      this.newRestaurant.specialFood[0]._id= rdmId;
      this.newRestaurant.specialFood[0].price= "$"+this.newRestaurant.specialFood[0].price;
      this.restaurantService.addFood(this.newRestaurant)
        .then(restaurant => {
          console.log('food saved', restaurant);
          this.errorMsg= "success"
          
          
          this.newRestaurant.specialFood[0].name = "";
          this.newRestaurant.specialFood[0].price = "";
          window.location.href = "list/"+this.newRestaurant._id;
        });

    } else {
      this.errorMsg = 'error';
    }

  }

 
  @Input() restaurant: Restaurant;
}
