import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'productDetail/:pid', component:ProductDetailComponent}
];