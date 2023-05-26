import { Component, OnInit, Input } from '@angular/core';
import { Restaurant, specialFoodSchema } from '../restaurant';
import { RestaurantServiceService } from '../restaurant-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantServiceService, private route: ActivatedRoute) { }

  public specialFoodData: specialFoodSchema = {
    _id: '',
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
  public content = {
    title: "Add"
  }


  ngOnInit(): void {

    var curURL = window.location.href;
    //var isNewOrUpdate = curURL.substring(curURL.lastIndexOf('/') + 1);
    var isUpdate = curURL.includes("update");
    
    //console.log(curURL.substring(curURL.lastIndexOf('/')+1))
    console.log(isUpdate);
    if (isUpdate) {
      this.route.params.pipe(switchMap((params: Params) => {

        this.content.title = "Update"
        return this.restaurantService.getSingleRestaurants(params['id']);


      }))
        .subscribe((newRestaurant: Restaurant) => {

          this.newRestaurant = newRestaurant;

       
          //this.pageContent.header.title = newFood.name;
          //this.pageContent.header.body = 'Details for selected Food.';
        });

    }
   
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

    if (this.formIsValid()) {
      
      console.log(this.newRestaurant)
      if (this.newRestaurant._id != undefined && this.newRestaurant._id !="") {
        this.restaurantService.updateRestaurant(this.newRestaurant)
          .then(restaurant => {
            console.log('restaurant updated', restaurant);
            window.location.href = "list/" + this.newRestaurant._id;
          });

      }
      else {
        this.newRestaurant.specialFood = [];
        this.restaurantService.createRestaurant(this.newRestaurant)
          .then(restaurant => {
            console.log('restaurant saved', restaurant);
            window.location.href = "list";
          });

      }

    } else {
      this.errorMsg = 'val';
    }

  }

  // public createNewRestaurant(newRestaurant: Restaurant): void {

  //   this.errorMsg = "";
  //   this.restaurantService.createRestaurant(newRestaurant)
  //     .then(restaurant => {
  //       console.log('restaurant saved', restaurant);
  //       window.location.reload();
  //     });
  // }

  @Input() restaurant: Restaurant;

}
