import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {admin_config} from '../../../core/_config'
// import { admin } from 'src/app/core/_models';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    form: FormGroup
    model_quality = admin_config.model_quality
    plan = admin_config.plan
    constructor(@Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialog, public fb: FormBuilder, public dialogRef: MatDialogRef<ModalComponent>) {

      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        admin:[this.data.admin],
        plan:['BASIC'],
        project_count:[1],
        model_quality:['3'],
      });
      console.log(this.data.is_active)
      if(this.data.mode === 'edit') {
        this.form.controls.name.setValue(this.data.name)
        this.form.controls.email.setValue(this.data.email)
        this.form.controls.email.disable()

      }
    }

    get(e){
      this.form.controls.plan.setValue(e)
    }
  
    onNoClick(): void {
      this.dialog.closeAll();
    }

    submit() {
      if(this.form.value.name) {   

      this.dialogRef.close([{...this.form.value, activate:this.data.is_active}, this.data.mode])
      } 
    }

}
