import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ListService } from '../list.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private listService: ListService) { }

  ngOnInit() {
  }
  //myDate : Date;
  onAddList(form: NgForm) {
    
    if(!form.valid)
    {
      return;
    }

    console.log(form.value);
    console.log(form.value.date);
  //  this.myDate = new Date(form.value.date);
    //console.log(this.myDate);

    this.listService.AddListInformation(form.value.item,
      form.value.price, form.value.itemImage).subscribe(
        ()=>{
          //do something after out operation has finished
        }
      );
    console.log(form.value);
    form.resetForm();
  }

}
