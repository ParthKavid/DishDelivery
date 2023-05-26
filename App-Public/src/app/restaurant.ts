import { Component, OnInit } from "@angular/core";

export class specialFoodSchema{
    _id:string;
    name:string;
    price:string;
}

export class Restaurant {
    _id:string;
    restaurantsName:string;
    address:string;
    city:string;
    province:string;
    postalCode:String;
    rating:number;
    phoneNumber:string;
    imagePath:string;
    specialFood:specialFoodSchema[];
}
