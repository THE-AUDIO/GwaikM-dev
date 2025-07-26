import { Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { StressComponent } from './stress/stress.component';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { VertigoComponent } from './vertigo/vertigo.component';

export const routes: Routes = [
    {
         path:"chat", loadComponent:()=> import("./chat/main/main.component").then(c=>c.MainComponent)
    },
    {
        path:"",component:PresentationComponent
    },
    {
        path:"stress", component: StressComponent
    },
    {
        path:'calc', component:CalculatriceComponent
    },
    {
        path:'vertigo', component:VertigoComponent
    }
];
