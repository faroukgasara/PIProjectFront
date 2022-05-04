import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-count-total-users-by-year',
  templateUrl: './count-total-users-by-year.component.html',
  styleUrls: ['./count-total-users-by-year.component.scss']
})
export class CountTotalUsersByYearComponent implements OnInit {

  sub  :any= [];
  month  :any= [];
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,private UserHttp: UserService) { }

  ngOnInit() {
    let object = new Object();

    let map = new Map<number, number>();
    this.UserHttp.countSubscriberByMonth().subscribe(
  		(data) => {

        object = data;
        for (let index = 0; index < Object.keys(object).length; index++) {
          //console.log(Object.values(object)[index][0])

          this.sub.push(Object.values(object)[index][0]);
          this.month.push(Object.values(object)[index][1]);
        }
        this.chart()
      }
  	);

  }

  chart(){
    var canvas: any = document.getElementById("lineChartExample2");
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");
    var chartBig = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: this.month,
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
          data:this.sub
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
