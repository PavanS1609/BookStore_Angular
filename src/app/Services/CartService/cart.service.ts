import { Injectable } from '@angular/core';
import { HttpsService } from '../HttpService/https.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token:any;
  
  constructor(private httpService: HttpsService) {
    this.token=localStorage.getItem('token');
   }
  base = environment.baseUrl;

  displayCart() {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.GetService(this.base + `Cart/CartList` ,true, header);
  }
  addToCart(data: any){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.PostService(this.base + `Cart/Cart_Register?Book_Id=`+ data.book_Id, data, true, header);
  }

  removeBookFromCart(data:any){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.DeleteService(this.base + `Cart/DeleteCart?cart_Id=` + data.cart_Id, true, header);
  }
  
}
