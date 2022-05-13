import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../model/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  token = localStorage.getItem('token');
	Url:string = 'http://localhost:8080/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  options1 = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    responseType: 'text' as 'text' 
  };

  getComplaints(){
    return this.http.get<Complaint[]>(this.Url+"/Reclamation/getAll",this.options);
  }
  
  deleteComplaint(complaint: Complaint | number):Observable<Complaint>{
  	const id = typeof complaint === 'number' ? complaint : complaint.id;
  	return this.http.delete<Complaint>(this.Url+'/Reclamation/delete/'+id,this.options);
  }

  addComplaint(reported: string,reportedby: string,reason: string,type: string){
  	return this.http.post(this.Url+'/Reclamation/add/'+reported+'/'+reportedby+'/'+reason+'/'+type,null,this.options);
  }
}
