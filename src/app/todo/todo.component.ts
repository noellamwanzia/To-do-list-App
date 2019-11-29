import { Component, OnInit } from '@angular/core';
import {TodoService } from './shared/todo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
toDoListArray:any[];
  constructor(private td:TodoService) { }

  ngOnInit() {
    this.td.getToDoList().snapshotChanges().subscribe(item=>{
      this.toDoListArray=[];

      item.forEach(element=>{
        var x=element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      });

      this.toDoListArray.sort((a,b)=>{
        return a.isChecked - b.isChecked;
      })
    });
  }
  onAdd(itemTitle){
    this.td.addTitle(itemTitle.value);
    itemTitle.value=null;
  }
  alterCheck($key:string,isChecked){
    this.td.checkOrUncheckTitle($key,!isChecked);
  }
  onDelete($key:string){
    this.td.removeTitle($key);
  }

}
