import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingModel } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';
declare const annyang: any;
@Component({
  selector: 'app-recherchevocale',
  templateUrl: './recherchevocale.component.html',
  styleUrls: ['./recherchevocale.component.scss']
})
export class RecherchevocaleComponent implements OnInit {

  constructor(private ngZone: NgZone,
    private router: Router,
    private FactServ: TrainingService) { }
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  fact: TrainingModel = new TrainingModel();
  ngOnInit(): void {
    
    
    
  }
 
}
