import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferModel } from '../model/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
    token = localStorage.getItem('token');
	offerUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getOffers(){
  	return this.http.get<OfferModel[]>(this.offerUrl+"/Offer/offers",this.options);
  }

  deleteOffer(offer: OfferModel | number):Observable<OfferModel>{
  	const id = typeof offer === 'number' ? offer: offer.id;
  	return this.http.delete<OfferModel>(this.offerUrl+'/Offer/delete-offer/'+id,this.options);
  }

  /*postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: yourHeadersConfig })
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
}*/

}