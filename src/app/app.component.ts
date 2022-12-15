import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD-APP';



  displayedColumns: string[] = ['productName', 'category','date','freshnessList', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog , private api : ApiService){}
  ngOnInit(): void {
this.getAllProduct()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'

    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProduct();
      }
    })
  }
getAllProduct(){
this.api.getProduct()
.subscribe({
  next:(res)=>{
this.dataSource=new MatTableDataSource(res);  
this.dataSource.paginator=this.paginator;    
this.dataSource.sort = this.sort
  },
  error:(e)=>{
    alert('error wgile fetching the records!!!')
  }
})
}



edit(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllProduct();
    }
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
delete(id:number){
  this.api.delete(id)
  .subscribe({
    next:(res)=>{
      alert("Deleted  Successfully")
      this.getAllProduct()
    },
    error:()=>{
      alert("Error While Deleting")
    }
  })
}
}
