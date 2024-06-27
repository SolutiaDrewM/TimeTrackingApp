import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TimeEntryComponent } from './components/time-entry/time-entry.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path:'', redirectTo: '/login', pathMatch: 'full'},
    { path:'login', component: LoginComponent},
    { path:'projects', component: ProjectsComponent, canActivate: [authGuard]},
    { path:'time-entry', component: TimeEntryComponent, canActivate: [authGuard]},
    { path:'time-input', component: TimeInputComponent, canActivate: [authGuard]}
];