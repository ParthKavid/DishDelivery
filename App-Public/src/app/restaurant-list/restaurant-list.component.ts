import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantServiceService } from '../restaurant-service.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  providers:[RestaurantServiceService]
})

export class RestaurantListComponent implements OnInit {
  
  constructor(private restaurantService: RestaurantServiceService) { }
  
   restaurants :  Restaurant[];

  // private getRestaurants(): void {
  //   this.restaurantService
  //     .getRestaurants()
  //       .then(foundRestaurants => this.restaurants = foundRestaurants);
  // }

  ngOnInit(): void {
    this.restaurantService
      .getRestaurants()
      .then((restaurant: Restaurant[])=>{
        this.restaurants = restaurant.map(restaurant =>{
          
          return restaurant;
        });
      });
  }
  counter(i: number) {
    return new Array(i);
}
}
