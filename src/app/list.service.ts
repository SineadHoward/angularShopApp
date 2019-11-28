import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  GetListInformation():Observable<any>{
    return this.http.get('http://localhost:4000/api/list');
  }

  AddListInformation(item:string,price:number,itemImage:string):Observable<any>{
    const List:List = {item:item, price:price, itemImage:itemImage};
    return this.http.post('http://localhost:4000/api/list', List)
  }

  DeleteList(id:String):Observable<any>{
    return this.http.delete('http://localhost:4000/api/list/'+id);
  }

  GetList(id:String):Observable<any>{
    return this.http.get('http://localhost:4000/api/list/'+id);
  }

  UpdateList(id:String,item:string, price:number, itemImage:string):Observable<any>{
    const List:List = {item:item, price:price, itemImage:itemImage};
    console.log("Edit"+id);
    return this.http.put('http://localhost:4000/api/list/'+id, List);
  }



}
