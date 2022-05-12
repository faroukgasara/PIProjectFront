import { Component, NgZone, OnInit,ViewChild } from '@angular/core';
import { TrainingModel } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Chart} from 'chart.js';

declare const annyang: any;

@Component({
  selector: 'app-trainingsback',
  templateUrl: './trainingsback.component.html',
  styleUrls: ['./trainingsback.component.scss']
})
export class TrainingsbackComponent implements OnInit {
  trainings: TrainingModel[];
  trainingList: any
  dataSource!: MatTableDataSource<any>;

  
  trainingstri:TrainingModel[]=[];
  Nbmax:Number[]=[];
  trainingNames:string[]=[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private TrainingHttp: TrainingService,private router:Router,private ngZone: NgZone,
   
    private FactServ: TrainingService) { }
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  fact: TrainingModel = new TrainingModel();

  ngOnInit(): void {
    this.getTrainings()

    this.TrainingHttp.getClasseByDesc().subscribe(
      (data:TrainingModel[])=>{ 
        this.trainingstri = data;
        for (let training of this.trainingstri)
        {
          this.Nbmax.push(Number(training.nbrMaxApprenant));
          this.trainingNames.push(training.title);
        }

        const myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              labels: this.trainingNames,
              datasets: [{
                  label: '# Users',
                  data: this.Nbmax,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });




      }
    );

  }
  getTrainings(){
    this.TrainingHttp.getTrainings().subscribe(
  		(data:TrainingModel[]) => { this.trainings = data;
        let n = data.length;
        for(let i=0;i<=this.trainings.length;i++){
          this.trainings[i].affiche = '../../assets/img/'+this.trainings[i].affiche.substring(12,this.trainings[i].affiche.length);

          //console.log(this.trainings[i].affiche.substring(11,this.trainings[i].affiche.length));
      };
      
       // this.trainings.affiche
        console.log(this.trainings)});
  }

  deleteTraining(id: number){
  	this.TrainingHttp.deleteTraining(id)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }
  updatetrainings(id:number)
  {
    let user=JSON.parse(localStorage.getItem('user'));
  console.log(localStorage.getItem('user'))

    console.log(id);
    this.router.navigate(['updatetrainings',user.email,id]);
  }

  SearchTraining(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.trainings) {
      if (s.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      {
        results.push(s);
      }
    }
    this.trainings = results;
    console.log(this.trainings);

    
    if ( !key) {
      this.getTrainings()
    }
  }


  image: any;
  initializeVoiceRecognitionCallback(): void {
    annyang.addCallback('error', (err: any) => {
      if (err.error === 'network') {
        this.voiceText = 'Internet is require';
        annyang.abort();
        this.ngZone.run(() => (this.voiceActiveSectionSuccess = true));
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => (this.voiceActiveSectionError = true));
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => (this.voiceActiveSectionListening = true));
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => (this.voiceActiveSectionError = true));
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid: any) => {
      this.ngZone.run(() => (this.voiceActiveSectionError = false));
      let queryText: any = userSaid[0];
      annyang.abort();
      this.voiceText = queryText;
      console.log(queryText);
      // route to the given Voice
      this.router.navigateByUrl('/gestionformation/' + this.voiceText);
      console.log (this.voiceText)
      this.ngZone.run(() => (this.voiceActiveSectionListening = false));
      this.ngZone.run(() => (this.voiceActiveSectionSuccess = true));
    });
  }

  startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

    if (annyang) {
      let commands = {
        'demo-annyang': () => {},
      };

      annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
    }
  }

  closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    this.voiceText = undefined;

    if (annyang) {
      annyang.abort();
    }
  }

  public exportHtmlToPDF(){
    let data = document.getElementById('htmltable');
      
      html2canvas(data).then(canvas => {
     
        
  
          
          let docWidth = 208;
          let docHeight = canvas.height * docWidth / canvas.width;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          
          doc.save('exportedPdf.pdf');
      });
  }


  getClasseByL(){
    this.TrainingHttp.getClasseByLabel().subscribe(
      (data:TrainingModel[])=> this.trainings = data
    );
  }
  getClasseDesc(){
    this.TrainingHttp.getClasseByDesc().subscribe(
      (data:TrainingModel[])=> this.trainings = data
    );
  }


}
