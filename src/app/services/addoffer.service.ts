import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferModel } from '../model/offer.model';

@Injectable({
  providedIn: 'root'
})
export class AddOfferService {

  newOffer = new OfferModel()
  token = localStorage.getItem('token');
  offerUrl:string = 'http://localhost:8089/WomenEmpowerment';
  offer: OfferModel;

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  addOffers(offer: OfferModel){
  	return this.http.post(this.offerUrl+"/Offer/add-offer",offer,this.options);
  }

  AffecterOfferByUserId( idOffer: number, email : string ){ 
    return this.http.post(this.offerUrl+'/Offer/AffecterOfferByUserId/'+idOffer+'/'+email,null,this.options);
}
}