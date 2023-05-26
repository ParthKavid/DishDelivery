import { Component, OnInit,Input } from '@angular/core';
import { RestaurantServiceService } from '../restaurant-service.service';
import { Restaurant } from '../restaurant';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
  providers: [RestaurantDetailComponent]
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private restaurantService: RestaurantServiceService, private route: ActivatedRoute) { }

  newRestaurant : Restaurant;
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.restaurantService.getSingleRestaurants(params['id']);
    }))
      .subscribe((newRestaurant: Restaurant) => {
        this.newRestaurant = newRestaurant;
        console.log(this.newRestaurant.restaurantsName)
        //this.pageContent.header.title = newFood.name;
        //this.pageContent.header.body = 'Details for selected Food.';
      });
  }
  counter(i: number) {
    return new Array(i);
}
public onDelete():void{
  if(confirm("Are you sure to delete this restaurant?")) {
    //console.log(this.newRestaurant)
    this.restaurantService
    .deleteRestaurant(this.newRestaurant._id)
    .then((restaurant: Restaurant)=>{
      window.location.href = "list"
    });
  }
}

public onDeleteFood(id,Res_id):void{
  if(confirm("Are you sure to delete this food item?")) {
   
    this.restaurantService
    .deleteFood(id,Res_id)
    .then((restaurant: Restaurant)=>{
    window.location.href = "list/"+this.newRestaurant._id;
    });
  }
}


public onUpdate(id:string):void{
 window.location.href="update/"+id; 
}
}
