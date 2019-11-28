import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  MyList: any = [];
  total: number = 0;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.GetListInformation().subscribe((data) => {
      this.MyList = data.list;
      console.log("This is my list" + this.MyList);

      console.log(data.list[0].price);
      
      for (let i = 0; i < data.list.length; i++) {
         console.log(data.list[0].price);
        this.total+=parseFloat(data.list[i].price);
      }  
      console.log("total price = " + this.total);
    })
  }

  onDelete(id:String){
    console.log("Deleting item with id: "+id);
    this.listService.DeleteList(id).subscribe(
      ()=>{
        this.ngOnInit();
      }
    );
  }



}
