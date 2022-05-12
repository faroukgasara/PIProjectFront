import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  isDataAvailable=false;
  age  :any= [];
  count  :any= [];
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private UserHttp: UserService) { }

  ngOnInit() {
    let object = new Object();

    let map = new Map<number, number>();
    this.UserHttp.countTotalUsersByAge().subscribe(
  		(data) => {

        object = data;
        for (let index = 0; index < Object.keys(object).length; index++) {
          //console.log(Object.values(object)[index][0])

          this.age.push(Object.values(object)[index][0]);
          this.count.push(Object.values(object)[index][1]);
        }
        this.chart()
      }
  	);

  }

  chart(){
    var canvas: any = document.getElementById("lineChartExample");
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");
    var chartBig = new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        labels: this.age,
        datasets: [{
          label: "Data",
          fill: true,
          backgroundColor: gradientFill,
          borderColor: '#e44cc4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#e44cc4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#be55ed',
          //pointHoverBorderColor:'rgba(35,46,55,1)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data:this.count
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#ccc',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              display: false,
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      }
    });
  }

}
