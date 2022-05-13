import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingModel } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-detailtraining',
  templateUrl: './detailtraining.component.html',
  styleUrls: ['./detailtraining.component.scss']
})
export class DetailtrainingComponent implements OnInit {
  id:number;
  training:TrainingModel;
  trainingsD:TrainingModel[];
  idFormation:number;
  constructor(private route:ActivatedRoute,private trainservice:TrainingService) { }

  ngOnInit(): void {
    this.idFormation=this.route.snapshot.params['idFormation'];
    this.training=new TrainingModel();
    this.trainservice.getTrainingById(this.idFormation).subscribe(data=>{
    this.training=data;
    this.training.affiche = '../../assets/img/'+this.training.affiche.substring(12,this.training.affiche.length);
    });
  }

}
