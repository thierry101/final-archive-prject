import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { AddEditComponent } from './components/archives/add-edit/add-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { ROUTING } from './app.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SingleArchiveComponent } from './components/archives/single-archive/single-archive.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ArchivesComponent,
    AddEditComponent,
    HeaderComponent,
    SingleArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ROUTING,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
