import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, data: { authType: 'login' } },
  { path: 'register', component: AuthComponent, data: { authType: 'register' } },
  { path: '', component: MainLayoutComponent, children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'user', children: [
        { path: ':username', component: ProfileComponent, data: { pageName: 'profile'} }
        ]
      },
      { path: 'settings', component: SettingsComponent, data: { pageName: 'settings'} },
      { path: 'c/:discussionName', component: HomeComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
