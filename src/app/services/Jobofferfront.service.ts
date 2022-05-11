import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsModel } from '../model/events';
import { OfferModel } from '../model/offer.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class JobofferfrontService {
    token = localStorage.getItem('token');
	userUrl:string = 'http://localhost:8089/WomenEmpowerment';

    newOffer = new OfferModel()
    offerUrl:string = 'http://localhost:8089/WomenEmpowerment';
    offer: OfferModel;
    user: UserModel;
  

  constructor(private httpClient:HttpClient) { }
  SERVER_URL: string = "http://localhost:8089/WomenEmpowerment/Offer/file";
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  public upload(formData){
      console.log("upload service function is called")
      console.log(formData)
      return this.httpClient.post<FormData>(this.SERVER_URL, formData,{
          reportProgress: true,
          observe: 'events'
      });
  }

  
  JobApplication(email : string , idOffer: number){ 
    return this.httpClient.post(this.offerUrl+'/Offer/apply/'+idOffer+'/'+email,null,this.options);
}

suggestedOffer( idUser: number){

  return this.httpClient.get<OfferModel[]>(this. offerUrl+'/Offer/suggestedOffer/'+idUser,this.options);

}

}