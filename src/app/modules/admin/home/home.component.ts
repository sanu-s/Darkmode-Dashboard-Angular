import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../core/_services/user.service'


// import { admin, user } from '../../../core/_models/admin.model'

import { ModalComponent } from '../../../modules/shared/modal/modal.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSource;

  mode;
  userdata;
  admindata;
  usertype = 'admin';
  selectedEl;
  constructor(private userservice: UserService, public dialog: MatDialog, public router:Router) { }


  displayedColumns: string[] = ['id', 'name', 'email', 'created_at', 'is_active', 'is_deleted', 'options'];

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  ngOnInit(): void {
    // localStorage.removeItem('currentUser');
    this.getUsers()


  }

  edit(event) {
    this.openDialog(event)
  }

  type(type) {
    this.usertype = 'admin'
    if (type.index === 1) {
      this.usertype = 'normal'
    }
    this.getUsers()
  }

  getUsers() {
    if (!this.admindata && this.usertype === 'admin') {
      this.userservice.users('GET', this.usertype).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.admindata = data
      })
    } else if (this.usertype === 'admin') {
      this.dataSource = new MatTableDataSource(this.admindata);
   
    }

    if (!this.userdata && this.usertype === 'normal') {
      this.userservice.users('GET', this.usertype).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.userdata = data
      })
    } else if (this.usertype === 'normal') {
      this.dataSource = new MatTableDataSource(this.userdata);
  
    }

  }


  openDialog(data = null) {
    let values
    let type = 'POST'
    if (!data) {
      values = {
        mode: 'create',
        name: '',
        email: '',
        admin: this.usertype == 'admin' ? true : false
      }
    } else {
      type = 'PUT'
      values = { mode: 'edit', name: data.name, email: data.email, admin: this.usertype == 'admin' ? true : false, is_active: data.is_active }
    }

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: values
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

        if (result[1] === 'edit') {
          result[0].id = data.id
          result[0].email = data.email
        } if (result[0].admin === true || result[1] === 'edit') {
          delete result[0].plan
          delete result[0].project_count
          delete result[0].model_quality
        } if (result[1] === 'create' && result[0].plan !== 'CUSTOM') {
          result[0].model_quality = ''
        }
        delete result[0].mode
        this.updateData(result[0], type)
      }
    });
  }

  updateData(result, type) {
    this.userservice.users(type, result).subscribe(x => {
      if (type == 'POST') {
        this.dataSource.data.push(x.detail)
      } else {
        let index = this.dataSource.data.findIndex(val => val.id == x.id)
        this.dataSource.data[index] = x
      }
      this.dataSource.data = this.dataSource.data
    })
  }
  delete(id, email) {
    this.userservice.users('DELETE', { id: id, email: email }).subscribe(x => {
      let index = this.dataSource.data.findIndex(val => val.id == id)
      this.dataSource.data[index] = x
      this.dataSource.data = this.dataSource.data
    })
  }
navigateTodetails(id) {
  if(this.usertype=='normal') {
  this.router.navigateByUrl(`/user-details/${id}`)
  }
}

}

