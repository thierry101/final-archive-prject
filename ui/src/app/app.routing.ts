import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { ArchivesComponent } from "./components/archives/archives.component";


const appRoutes : Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full'},
    {path:"archive", 
    children: [
        {path:"list", component:ArchivesComponent},
    ]},
    // { path: 'add-archive', redirectTo: '/archive/show-all', pathMatch: 'full' },
]

export const ROUTING = RouterModule.forRoot(appRoutes)