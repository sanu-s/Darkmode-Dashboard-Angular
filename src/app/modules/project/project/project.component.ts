import { Component, OnInit, Inject, Input } from '@angular/core';
import {ProjectService} from '../../../core/_services'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface DialogData {
  name: string;
  description: string;
  mode:string;
  id:number;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  panelOpenState = false;
  projects;
  opened;
  view = true;
  searchText;

  @Input('project')
  set newproject(value: any) {
    if(value){
    this.projects.unshift(value)
    }
  }


  constructor(private ps:ProjectService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ps.list().subscribe((x)=>{
      this.projects = x;
    })
  }

  onEvent(event) {
    event.stopPropagation();

 }
 open(i){
   this.ps.project('GET', i).subscribe(x=>this.opened=x)
 }
 openDialog(p, mode): void {
  const dialogRef = this.dialog.open(Dialogue, {
    height: mode==='edit'?'300px':'150px',
    width: mode==='edit'?'600px':'400px',
    data: {mode: mode, id:p?.id, name: p.name, description: p.description}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result!== 'DELETE'){
    if(result && (result.name !== p?.name || result.description !== p?.description) ) {
      this.ps.project('PUT', {id:p?.id, ...result}).subscribe(x=>{
       let index =  this.projects.findIndex(pro=>pro.id == x.id)
        this.projects[index] = x
      })
    }
  } else {
    this.ps.project('DELETE',{id:p?.id}).subscribe(()=>{
      this.projects = this.projects.filter(x=>x.id !== p?.id)
    })
  }
  });
}

}

@Component({
  selector: 'dialogue',
  templateUrl: 'dialogue.html',
  styleUrls: ['./project.component.scss']
})
export class Dialogue {
  projectForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<Dialogue>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.projectForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength]],
        description: ['', [Validators.required, Validators.minLength]],
      })
    }
    ngOnInit(): void {
      console.log(this.data)
      this.projectForm.controls.name.setValue(this.data.name)
      this.projectForm.controls.description.setValue(this.data.description)
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.dialogRef.close(this.projectForm.value);
  }
  delete() {
    this.dialogRef.close('DELETE');
  }

}