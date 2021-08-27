import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: 'profile', loadChildren: './modules/utilities/utilities.module#UtilitiesModule' },
  { path: 'projects', loadChildren:'./modules/project/project.module#ProjectModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
