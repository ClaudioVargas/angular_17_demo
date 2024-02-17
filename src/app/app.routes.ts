import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    // { path: '**', component: HeaderComponent },  // Wildcard route for a 404 page
    { path: 'main', component: MainComponent },
    { path: '',   redirectTo: '/main', pathMatch: 'full' }, // redirect to 
];
