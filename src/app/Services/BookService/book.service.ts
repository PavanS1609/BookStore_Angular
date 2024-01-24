import { Injectable } from '@angular/core';
import { HttpsService } from 'src/app/Services/HttpService//https.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  base = environment.baseUrl;
  constructor(private httpService: HttpsService) { }

  getBooks(){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpService.GetService(this.base + `Book/BooksList`, false, header);
  }
}
