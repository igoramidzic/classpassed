import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NgPipesModule} from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/pages/user/user.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    UserComponent,
    ProfileComponent,
    SettingsComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
    AngularFireAuthModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
