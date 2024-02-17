import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimaryImage, Title } from '../models/title.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  test(): Observable<any> {

    var url =  'https://moviesdatabase.p.rapidapi.com/titles'

    let httpOptions = {
      headers: new HttpHeaders({
        
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-RapidAPI-Key': '43f3912ee0msha0c0df52527a97fp18b7bdjsna7afaa404d6e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      })
    }

    return this.http.get(url, httpOptions)
  }
 
  save(title: Title) {
    
    
  }
}
