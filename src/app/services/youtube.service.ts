import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  token = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  getChannnels(channelName) : Observable<any>{
    const API_KEY="AIzaSyD-A0t5HmOjOcTzE389Cqo8QNkzIa6k_Xg"
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    const url="http://localhost:8089/WomenEmpowerment/youtube-data?key="+API_KEY+"&part=snippet&q="+channelName+"&type=video&maxResults=20"
    return this.http.get<any>(url,options)
  }
}
