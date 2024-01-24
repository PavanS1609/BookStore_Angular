import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Services/BookService/book.service';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/Services/AddressService/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/Services/OrdersService/orders.service';



interface IBook{
  book_Name: any,
  author_Name: any,
  book_Price: any,
  book_Image: any,
  quantity:any
}

interface ICart {
  book_Id:any;
  book_Name: any,
  author_Name: any,
  book_Price: any,
  book_Image: any,
  quantity: any
}



@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.scss']
})
export class DisplayCartComponent implements OnInit {
  
  constructor(private book: BookService, private cart: CartService, private addAddres: AddressService, private _snackBar: MatSnackBar, private orderService: OrdersService) { }
  book_Name: any;
  author_Name: any;
  Price: any;
  Book_Id:any;
  book_Image:any;
  booksList:any;
  Cart_Id: any;
  cartList:ICart[]=[];
  

  selectedQuantity: number = 1; // Initial quantity
  minQuantity: number = 1; // Minimum quantity allowed

  incrementQuantity(book: IBook): void {
    book.quantity++;
  }

  decrementQuantity(book: IBook): void {
    if (book.quantity > this.minQuantity) {
      book.quantity--;
    }
  }

  ngOnInit(): void {
    this.displayCartItems();
  }

  Customer_Details=new FormGroup({
    customer_Name: new FormControl("", [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}(/s[A-Z]{1}[a-z]{1,})*$')]),
    customer_Number: new FormControl("", Validators.required),
    Address: new FormControl("", Validators.required),
    State: new FormControl("", Validators.required),
    City: new FormControl("", Validators.required),

  })

  displayCartItems(){
    console.log("not going to condition");
    this.cart.displayCart().subscribe((res:any)=>{
      console.log("data not coming");
      console.log(res.data);
      this.booksList = res.data;
      console.log("cart Values stored");
      this.cartList=this.booksList;
      console.log(this.booksList);
    

    })
   
  }

  addAddress() {
    console.log(this.Customer_Details)
    let data = {
      customer_Name: this.Customer_Details.value.customer_Name,
      customer_Number: parseInt(this.Customer_Details.value.customer_Number),
      address: this.Customer_Details.value.Address,
      state: this.Customer_Details.value.State,
      city: this.Customer_Details.value.City
     
    }
    this.addAddres.addCustomer_Address(data).subscribe((res: any) => {
      console.log(res.message);
      console.log(res.data);
      localStorage.setItem("token", res.data);
    });
  }

  onRemoveCartBook(book:any, message: string, action: string) {
    this.Cart_Id = book.cart_Id
    let data={
      cart_Id:this.Cart_Id
    }
    this.cart.removeBookFromCart(data).subscribe((res: any) => {
      console.log(res.message);
      console.log(book);
    });
    this._snackBar.open(message, action);
  }


  Orders(cartList:any){
    cartList .forEach((cart:any)=>{
      let data={
        cart_Id: cart.cart_Id,
        Book_Id:cart.book_Id,
        book_Name: cart.book_Name,
        Price: cart.book_Price *cart.quantity,
        quantity:cart.quantity
        
      }
      this.orderService.orderAdded(data).subscribe((res:any)=>{
        console.log(res.message);
      })
    })

  }



}
