import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/pages/user/user.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { ChannelsComponent } from './components/pages/channels/channels.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { LoadingComponent } from './components/spinners/loading/loading.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { PostDetailsComponent } from './components/pages/post-details/post-details.component';
import { CreatePostComponent } from './components/pages/channels/create-post/create-post.component';
import { ScrollableDirective } from './directives/scrollable.directive';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    UserComponent,
    ProfileComponent,
    SettingsComponent,
    ChannelsComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ChatComponent,
    CreatePostComponent,
    PostDetailsComponent,
    ScrollableDirective,
    TimeAgoPipe
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
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
