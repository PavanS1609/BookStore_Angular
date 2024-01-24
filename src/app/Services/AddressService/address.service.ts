import { Injectable } from '@angular/core';
import { HttpsService } from '../HttpService/https.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  base= environment.baseUrl;
  constructor(private httpService: HttpsService) 
  { 
    this.token = localStorage.getItem('token');
  }
  token:any;

  addCustomer_Address(data:any){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +this.token
      })
    }
    return this.httpService.PostService(this.base + `Address/Address_Register` ,data , true, header);
  }

  

}
