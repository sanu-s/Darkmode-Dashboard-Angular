import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import {Menu} from '../../../core/_models'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  exportAs: 'menuInOtherComponent',
})
export class MenuComponent implements OnInit {

 
  @Input() menuvalues: Menu[];

  @Output()
  menuselect = new EventEmitter<any>();

  @ViewChild(MatMenu) menu: MatMenu;

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(value) {
    this.menuselect.emit(value);
  }

}
