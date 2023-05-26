import { Component, OnInit,Input } from '@angular/core';
import { Restaurant, specialFoodSchema } from '../restaurant';
import { RestaurantServiceService } from '../restaurant-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantServiceService, private route: ActivatedRoute) { }

  
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
    imagePath: '/images/NoImage.jpg',
    phoneNumber: '',
    postalCode: '',
    province: '',
    rating: 5,
    specialFood: [this.specialFoodData]
  }


  ngOnInit(): void {
    
    // this.route.params.pipe(switchMap((params: Params) => {
    //   return this.restaurantService.getSingleRestaurants(params['id']);
    // }))
    //   .subscribe((newRestaurant: Restaurant) => {
      
    //     this.newRestaurant = newRestaurant;
    //     //this.pageContent.header.title = newFood.name;
    //     //this.pageContent.header.body = 'Details for selected Food.';
    //   });
  }

  
  public formVisible: boolean = false;

  public errorMsg = "";

  private formIsValid(): boolean {
    if (this.newRestaurant.restaurantsName && this.newRestaurant.phoneNumber && this.newRestaurant.address) {
      return true;
    } else {
      return false;
    }
  }

  public onSubmitRestaurant(): void {
    this.errorMsg = '';
    console.log(this.newRestaurant);
    if (this.formIsValid()) {
     
      this.restaurantService.createRestaurant(this.newRestaurant)
        .then(restaurant => {
          console.log('restaurant saved', restaurant);
          window.location.reload();
        });

    } else {
      this.errorMsg = 'All fields are required, please try again';
    }

  }
  @Input() restaurant: Restaurant;
}
