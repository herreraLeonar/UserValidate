import { Component, OnInit } from '@angular/core';

import { Request } from '../../services/request';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private request: Request) { }
   resp: any;
  ngOnInit() {
    this.request.get("/SampleData/WeatherForecasts?gr=0").subscribe(resp => {
      this.resp = resp; console.log(resp);
    });
  }

}
