import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    token = localStorage.getItem('token');
	userUrl:string = 'http://localhost:8089/WomenEmpowerment';

  user = JSON.parse(localStorage.getItem('user'));
  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  options1 = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    responseType: 'text' as 'text' 
  };

  
  findByEmail(user: UserModel | string){
    const email = typeof user === 'string' ? user : user.email;
  	return this.http.get<UserModel>(this.userUrl+"/user/findByEmail/"+email,this.options);
  }

  getUsers(){
  	return this.http.get<UserModel[]>(this.userUrl+"/user/getUsers",this.options);
  }

  getNotif(){
  	return this.http.get(this.userUrl+"/notificationuser/findByUserEmailContains/"+this.user.email,this.options);
  }

  getAnswer(question:any){
  	return this.http.get(this.userUrl+"/chatbot/answer/"+question+"/"+"a",this.options1);
  }

  getReporting(){
  	return this.http.get(this.userUrl+"/reporting/getReports",this.options);
  }

  deleteUser(user: UserModel | string):Observable<UserModel>{
  	const email = typeof user === 'string' ? user : user.email;
  	return this.http.delete<UserModel>(this.userUrl+'/user/deleteUser/'+email,this.options);
  }


  addToBlacklist(email: string){
  	return this.http.post(this.userUrl+'/blacklist/addUserToBlacklist/'+email,null,this.options);
  }


  getBlacklist(){
  	return this.http.get(this.userUrl+"/blacklist/getAllBlacklist",this.options);
  }

  deleteFromBlacklist(id: number){
  	return this.http.delete(this.userUrl+'/blacklist/deleteUserFromBlacklist/'+id,this.options);
  }


  deleteReporting(id: number){
  	return this.http.delete(this.userUrl+'/reporting/deleteReport/'+id,this.options);
  }



  addReport(reported: string,reportedby: string,reason: string,type: string){
  	return this.http.post(this.userUrl+'/reporting/addReport/'+reported+'/'+reportedby+'/'+reason+'/'+type,null,this.options);
  }

  forgetpassword(email:string){
  	return this.http.get(this.userUrl+"/registration/forgetpassword/"+email);
  }

  resetpassword(email:string,token:string,newPass:string){
  	return this.http.get(this.userUrl+"/registration/reset/"+token+"/"+email+"/"+newPass);
  }

  fakeAccounts(){
  	return this.http.post(this.userUrl+'/user/fakeAccounts',null,this.options);
  }

  getfakeAccounts(){
  	return this.http.get(this.userUrl+"/user/getFakeAccounts",this.options);
  }

  countTotalUsersByAge(){
  	return this.http.get(this.userUrl+"/user/countTotalUsersByYear",this.options);
  }


  countSubscriberByMonth(){
  	return this.http.get(this.userUrl+"/subscriber/countSubscriberByMonth",this.options);
  }
}