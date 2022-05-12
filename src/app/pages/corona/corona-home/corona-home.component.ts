import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/model/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-corona-home',
  templateUrl: './corona-home.component.html',
  styleUrls: ['./corona-home.component.scss']
})
export class CoronaHomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData:GlobalDataSummary[];
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next:(result)=>{
        console.log(result)
        this.globalData=result
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
            this.totalActive+=cs.active
            this.totalConfirmed+=cs.confirmed
            this.totalDeaths+=cs.deaths
            this.totalRecovered+=cs.recovered

          }

        })
      }
    })
  }

}
