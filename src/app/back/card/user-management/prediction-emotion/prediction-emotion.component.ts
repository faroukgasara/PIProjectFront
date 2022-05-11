import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PredictionEmotion } from 'src/app/services/predictionemotion.service';
import Chart from 'chart.js';
@Component({
  selector: 'app-prediction-emotion',
  templateUrl: './prediction-emotion.component.html',
  styleUrls: ['./prediction-emotion.component.scss']
})
export class PredictionEmotionComponent implements OnInit {

  facebookData:any=[];
  userEmotions:any=[]; 
  emotion  :any= [];
  value  :any= [];

  constructor(private dialog :MatDialog ,private predictionHttp: PredictionEmotion) { }

  ngOnInit(): void {
    let object = new Object();
    
    this.predictionHttp.getData("faroukgassara@live.comf").subscribe(
  		(data) => {this.facebookData = data;}
  	);
    this.predictionHttp.getEmotions("faroukgassara@live.comf").subscribe(
  		(data) => {this.userEmotions = data;
        object=data;
      for (let index = 0; index < Object.keys(object).length; index++) {
        this.emotion.push(Object.keys(object)[index]);
        this.value.push(Object.values(object)[index]);
      }
      }
  	);

    console.log(this.emotion)
    this.chart()

  }
  chart(){
    var canvas: any = document.getElementById("lineChartEmotions");
    var ctx = canvas.getContext("2d");

    var chartBig = new Chart(ctx, {
      type: 'pie',
      responsive: true,
      data: {
        labels: this.emotion,
        datasets: [{
          label: 'My First Dataset',
          data: this.value,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(234,228,89)',
            'rgb(1,190,254)',
            'rgb(46, 34, 73)',
            'rgb(42,59,144)',
            'rgb(170,0,0)'
          ],
          
        }]
      },
      
    });
  }
  



}
