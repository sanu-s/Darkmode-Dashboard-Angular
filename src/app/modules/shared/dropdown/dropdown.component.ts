import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Dropdown} from '../../../core/_models'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']

  
})
export class DropdownComponent implements OnInit {

  selected;
  items;
  @Input('values')
  set values(value: Dropdown[]) {
    
    this.items = value
    this.selected = value[0]
    console.log(this.items)
    this.select.emit(value[0]?.id?value[0]?.id:value[0]);
}

  @Output()
  select = new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  selectItem(value) {

    this.selected = value
    this.select.emit(value.id?value.id:value);
  }

}
