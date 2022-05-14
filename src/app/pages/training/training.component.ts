import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingModel } from '../../model/training';
import { TrainingService } from '../../services/training.service';
declare const annyang: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'dateDebut', 'dateFin', 'nbrMaxApprenant', 'affiche','formateur'];
  trainings: TrainingModel[];
  myAngularQrCode:any;
  trainings1: TrainingModel[];
  form!: FormGroup;
  constructor(private TrainingHttp: TrainingService,private router:Router,private ngZone: NgZone,private formBuilder: FormBuilder,
   
    private FactServ: TrainingService) { 

   // this.myAngularQrCode="";
  }
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text:new FormControl('',Validators.required),

      
    });
    this.getTrainingsrecommanded()
    this.TrainingHttp.getTrainings().subscribe(
  		(data:TrainingModel[]) => {
        this.trainings = data;
        let n = data.length;
        for(let i=0;i<=this.trainings.length;i++){
          this.trainings[i].affiche = '../../assets/img/'+this.trainings[i].affiche.substring(12,this.trainings[i].affiche.length);
          

          //console.log(this.trainings[i].affiche.substring(11,this.trainings[i].affiche.length));
      };
      
       // this.trainings.affiche
        console.log(this.trainings)}
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

  detailTrainings(idFormation:number)
  {
    this.router.navigate(['trainings',idFormation]);
  }
  applyFilter(filterValue:string )
  {
    // this.dataso
  }

  // jaimetraining(t:TrainingModel)
  // {
    
    
  //     let i=this.trainings.indexOf(t);
  //     this.trainings[i].like++;
    
  // }


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
      this.router.navigateByUrl('loujein' + this.voiceText);
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
  getTrainingsrecommanded(){
    this.TrainingHttp.getTrainingsRecommanded().subscribe(
  		(data:TrainingModel[]) => { this.trainings1 = data;console.log(this.trainings1)
        let n = data.length;
        for(let i=0;i<=this.trainings1.length;i++){
          this.trainings1[i].affiche = '../../assets/img/'+this.trainings1[i].affiche.substring(12,this.trainings1[i].affiche.length);

          //console.log(this.trainings[i].affiche.substring(11,this.trainings[i].affiche.length));
      };
      
       // this.trainings.affiche
        }
  	);
  }
  // searchRecommanded()
  // {
  //   this.TrainingHttp.searchRecommanded().subscribe(
  //     (data:TrainingModel[])
  //   );
  // }

  addsearch(key:string){

    let body = new HttpParams();
     body = body.set('text', key);
 
    // body = body.set('description', this.form.get(['description']).value);
    console.log( key);

    this.TrainingHttp.searchRecommanded(body)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
    
  }
  
  

 



}
