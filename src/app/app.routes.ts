import { Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';

export const routes: Routes = [
    {
         path:"", loadComponent:()=> import("./chat/main/main.component").then(c=>c.MainComponent)
    },
    {
        path:"pres",component:PresentationComponent
    }
];
