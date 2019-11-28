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
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.GetListInformation().subscribe((data) => {
      this.MyList = data.list;
      console.log(this.MyList);
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
