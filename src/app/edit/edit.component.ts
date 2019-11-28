import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
list:any=[];
  constructor(private listService:ListService, private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.listService.GetList(this.route.snapshot.params['id']).subscribe(
      (data) =>{
          this.list = data;
          console.log(this.list);
      }
    );

  }
  onEditList(form:NgForm){
    console.log(form.value.item);
    this.listService.UpdateList(this.list._id, form.value.item,
      form.value.price, form.value.itemImage).subscribe();
  }
}
