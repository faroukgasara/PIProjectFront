import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/model/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-corona-countries',
  templateUrl: './corona-countries.component.html',
  styleUrls: ['./corona-countries.component.scss']
})
export class CoronaCountriesComponent implements OnInit {

  data:GlobalDataSummary[];
  countries:string[]=[];
  constructor(private dataService:DataServiceService) { }

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)

      })

    })


  }
  updateValues(country:string){
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
        this.totalConfirmed = cs.confirmed;
      }
    })
      
  }

}
