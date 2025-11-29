import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  { path: 'show-all-employees', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'updating-by-id/:id', component: UpdateEmployeeComponent },
  { path: 'details-of-employee/:id', component: ShowDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AdminLoginComponent },

  // AJOUT : route wildcard pour rediriger toute URL inconnue vers home (utile après chargement de l’app)
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  // MODIF : activation du hash routing pour éviter le 404 côté serveur (Nginx) au refresh
  // -> les URLs deviennent /#/add-employee, et le serveur ne voit plus que /
  imports: [RouterModule.forRoot(routes, { useHash: true })], // AJOUT: { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule {}
