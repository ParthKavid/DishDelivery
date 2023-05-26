import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {
  constructor(private http: HttpClient) { }
  private restaurantsUrl = 'http://localhost:3000/api/restaurants';
  

  public getRestaurants(): Promise<void | Restaurant[]> {
    
    const url : string = `${this.restaurantsUrl}`;
    
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Restaurant[])
      .catch(this.handleError);

  }

  getSingleRestaurants(restaurantId: string): Promise<void | Restaurant> {
    return this.http.get(this.restaurantsUrl + '/' + restaurantId)
      .toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  createRestaurant(newRestaurant: Restaurant): Promise<void | Restaurant> {
    return this.http.post(this.restaurantsUrl, newRestaurant
    ).toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  addFood(newRestaurant: Restaurant): Promise<void | Restaurant> {
    return this.http.post('http://localhost:3000/api/addFood', newRestaurant
    ).toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }
  updateRestaurant(existsRestaurant: Restaurant): Promise<void | Restaurant> {
    return this.http.put(this.restaurantsUrl + '/' + existsRestaurant._id, existsRestaurant
    ).toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  deleteRestaurant(restaurantId: string): Promise<void | Restaurant> {
    return this.http.delete(this.restaurantsUrl + '/' + restaurantId)
      .toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  deleteFood(restaurantId: string,_id : String): Promise<void | Restaurant> {
    
    return this.http.delete('http://localhost:3000/api/deleteFood' + '/' + restaurantId+'/'+_id)
      .toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log("error");
  }

}
