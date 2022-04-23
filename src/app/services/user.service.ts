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

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getUsers(){
  	return this.http.get<UserModel[]>(this.userUrl+"/user/getUsers",this.options);
  }

  deleteUser(user: UserModel | string):Observable<UserModel>{
  	const email = typeof user === 'string' ? user : user.email;
  	return this.http.delete<UserModel>(this.userUrl+'/user/deleteUser/'+email,this.options);
  }



}