import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js';
import { OfferService } from 'src/app/services/offer.service';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html'
})
export class StatComponent implements OnInit {

  canvas: any;
  labels: string[] = [];
  numbers: number[] = [];
  ctx: any;
  constructor( private offerService: OfferService) { }

  ngOnInit(): void {
   // this.stats();
    this.ctx = document.getElementById('myChart');
  }


  redirectTo(path: string) {
    location.href = path;
  }
  
// agai,






//********************************************************* */
/*
public stats() {
  this.offerService.stats().subscribe((response: any[]) => {
    response.map((item) => {
      this.labels.push(item[0].titre);
      this.numbers.push(item[1]);
    });
    new chartJs.Chart(this.ctx, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [
        {
          label: '# of Votes',
          data: this.numbers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  });
}*/



}


