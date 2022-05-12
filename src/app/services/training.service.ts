import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingModel } from '../model/training';
import { UserModel } from '../model/user.model';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public tarinings: TrainingModel[];
  Training: TrainingModel = {
    title: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    nbrMaxApprenant: null,
    affiche: '',
    formateur:'',
    idFormation:1,
    // like:1,

  };
    token = localStorage.getItem('token');
	trainingsUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getTrainings(){
  	return this.http.get<TrainingModel[]>(this.trainingsUrl+"/Training/retrieve-all-Training",this.options);
  }

  createTraining(train: TrainingModel) {
   
    let user=JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'))
    return this.http.post<TrainingModel>(this.trainingsUrl+"/Training/add-training/"+user.email,train,this.options);
   
    
  }
 
 
 deleteTraining(training: TrainingModel | any):Observable<TrainingModel>{
  const idFormation = typeof training === 'number' ? training : training.idFormation;
  return this.http.delete<TrainingModel>(this.trainingsUrl+'/Training/remove-training/'+idFormation,this.options )
}


getTrainingById(id:number)
{
 
return this.http.get<TrainingModel>(this.trainingsUrl+"/Training/retrieve-Training/"+id,this.options)
}



updateTraining(training:any){
  let user=JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'))

  return this.http.put<TrainingModel>(this.trainingsUrl+"/Training/update-Training/"+user.email,training,this.options)
  }
  recommended()
  {
    return this.http.get<TrainingModel>(this.trainingsUrl+"/recomended",this.options)
  }
//fonctioonaliotes avancees:
  getTrainingsRecommanded(){
  	return this.http.get<TrainingModel[]>(this.trainingsUrl+"/Training/recomended",this.options);
  }

  searchRecommanded(k:HttpParams){
  	return this.http.post<TrainingModel[]>(this.trainingsUrl+"/Training/Search",k,this.options);
  }


  getClasseByLabel(){
    return this.http.get<TrainingModel[]>(this.trainingsUrl+"/Training/getTrainingASC",this.options);
  }

  getClasseByDesc(){
    return this.http.get<TrainingModel[]>(this.trainingsUrl+"/Training/getTrainingDesc",this.options);
  } 
  getPdfTraining(){
    return this.http.get(this.trainingsUrl+"/pdf/training/export/pdf");
  }
 

}