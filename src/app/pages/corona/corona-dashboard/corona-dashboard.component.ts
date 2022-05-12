import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-corona-dashboard',
  templateUrl: './corona-dashboard.component.html',
  styleUrls: ['./corona-dashboard.component.scss']
})
export class CoronaDashboardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;

  @Input('totalActive')
  totalActive;

  @Input('totalDeaths')
  totalDeaths;

  @Input('totalRecovered')
  totalRecovered;
  constructor() { }

  ngOnInit(): void {
  }

}
