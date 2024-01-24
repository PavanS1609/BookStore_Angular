import { Component, OnInit ,Input, Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs/internal/Subject';
import { GetBooksComponent } from 'src/app/components/get-books/get-books.component';
import { BookService } from 'src/app/Services/BookService/book.service';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})
export class DashboardComponent implements OnInit {

  booksList:any;
  book:any;
  pageSize = 5;
  allBooks:any;
  length:any;
  currentPage=0;
  

 
  constructor(public books : BookService,public dialog: MatDialog) 
  { }

 

  ngOnInit(): void {
    this.DisplayBooks();
  }

DisplayBooks(){
  this.books.getBooks().subscribe((res:any)=>{
      console.log(res.data);
      this.booksList=res.data;
      this.length=this.booksList.length;
      console.log("Book Values stored");
      console.log(this.booksList);
    this.updatePagedBooks(this.currentPage);
  })
}

  quickView(book:any)
  {
    const dialogbox = this.dialog.open(GetBooksComponent,{
      data: book,
      height: '1000px',
      width:'1000px'
  })
   
  }

  updatePagedBooks(currentPage:any) {
    currentPage=this.currentPage
    const startIndex = currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.allBooks = this.booksList.slice(startIndex, endIndex);
  

  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize;
    this.updatePagedBooks(this.currentPage);
  }
 }


