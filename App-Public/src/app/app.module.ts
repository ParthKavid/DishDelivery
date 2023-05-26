import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFoodComponent } from './add-food/add-food.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
@NgModule({
  declarations: [
    RestaurantListComponent,
    HomePageComponent,
    AboutComponent,
    FrameworkComponent,
    RestaurantDetailComponent,
    CreateRestaurantComponent,
    AddFoodComponent,
    UpdateRestaurantComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path:'',
      component:HomePageComponent
    },
    {
      path:'about',
      component:AboutComponent
    },
    {
      path:'list',
      component:RestaurantListComponent
    },
    {
      path:'list/:id',
      component:RestaurantDetailComponent
    },
    {
      path:'new',
      component:CreateRestaurantComponent
    }
    ,
    {
      path:'addFood',
      component:AddFoodComponent
    }
    ,
    {
      path:'update/:id',
      component:UpdateRestaurantComponent
    }
    ])
  ],
  providers: [{provide:APP_BASE_HREF,useValue:'/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
