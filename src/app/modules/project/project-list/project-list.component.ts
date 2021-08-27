import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ProjectService} from '../../../core/_services'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  new_project;

  constructor(public dialog: MatDialog) {

   }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogue, {
      height: '400px',
      width: '600px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.new_project = result;
      }
    });
  }
  

}

@Component({
  selector: 'create-dialogue',
  templateUrl: 'dialogue.html',
  styleUrls: ['./project-list.component.scss']
})

export class CreateDialogue {
  projectForm: FormGroup
  file: FormData = null;
  fileName;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogue>,
    public fb: FormBuilder, private ps:ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.projectForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength]],
        description: ['', [Validators.required, Validators.minLength]],
        file:['',Validators.required]
      })
    }
    ngOnInit(): void {
 
    }

    onSelectFile(event) {
      console.log(event)
      this.fileName = event[0].name;
      this.projectForm.controls.file.setValue(this.fileName)
      this.file = new FormData(); 
      this.file.append('file', event[0], event[0].name);
    }
  
    submit(){
      if(this.file){
      this.file.append('data',JSON.stringify(this.projectForm.value))
      this.ps.project('POST',this.file).subscribe((x)=>{
        this.dialogRef.close(x);
      })
    }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}