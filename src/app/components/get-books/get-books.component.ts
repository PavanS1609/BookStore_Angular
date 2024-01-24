import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/Services/BookService/book.service';
import { CartService } from 'src/app/Services/CartService/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})
export class GetBooksComponent implements OnInit {
  book_Image:any;
  book_Name: any;
  author_Name: any;
  book_Rating: any;
  book_Price: any;
  book_Details: any;
  book_Id:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogbox: MatDialogRef<GetBooksComponent>,
    private cart: CartService, private _snackBar: MatSnackBar
   ) 
    {
      this.book_Image=data.book_Image,
      this.book_Name=data.book_Name,
        this.author_Name = data.author_Name,
        this.book_Price = data.book_Price,
        this.book_Rating = data.book_Rating,
        this.book_Details = data.book_Details,
        this.book_Id=data.book_Id,
        console.log(data);
    }

  ngOnInit(): void {
  }

  addToCart(message:string,action:string){
    let data= {
       book_Id : this.book_Id
     }
    this.cart.addToCart(data).subscribe((res: any) => {
      console.log("addeed");
      console.log(res);
    });
    this._snackBar.open(message, action);
  }
 
  

}

