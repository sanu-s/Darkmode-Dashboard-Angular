import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent, CreateDialogue} from './project-list/project-list.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProjectComponent, Dialogue } from './project/project.component';
import {SharedModule} from '../shared/shared.module'
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from '../../core/_pipes/search.pipe';


@NgModule({
  declarations: [ProjectListComponent, ProjectComponent, Dialogue, ProjectDetailsComponent, CreateDialogue,  SearchPipe],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    SharedModule,
    MatDialogModule,
    FormsModule, 
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
