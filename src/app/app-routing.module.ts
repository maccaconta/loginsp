import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: 'orchest/v1/login', component: AppComponent },
    { path: 'orchest/v1/loginsp', component: AppComponent }

    // { path: '', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

    constructor(){
        
    }

}
