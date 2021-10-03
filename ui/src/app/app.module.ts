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

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ArchivesComponent,
    AddEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ROUTING,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
