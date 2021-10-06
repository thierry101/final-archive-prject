import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { ArchivesComponent } from "./components/archives/archives.component";
import { SingleArchiveComponent } from "./components/archives/single-archive/single-archive.component";
import { AuthGuard } from "./security/auth/auth.guard";


const appRoutes : Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component:AuthenticationComponent, canActivate:[!AuthGuard]},
    {path:"archive", 
    children: [
        {path:"list", component:ArchivesComponent, canActivate:[AuthGuard]},
    ]},
    {path: "show-archive/:id", component:SingleArchiveComponent, canActivate:[AuthGuard]} //, canActivate:[AuthGuard], data:{claimName:'role'} , canActivate:[AuthGuard]
]

    export const ROUTING = RouterModule.forRoot(appRoutes)