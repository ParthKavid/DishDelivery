import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: "DishDelivery",
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit down.\n\nAnd more!!'
  }
}
