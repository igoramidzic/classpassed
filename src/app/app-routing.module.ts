import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { ChannelsComponent } from './components/pages/channels/channels.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './components/pages/chat/chat.component';
import { PostDetailsComponent } from './components/pages/post-details/post-details.component';
import { CreatePostComponent } from './components/pages/channels/create-post/create-post.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [NotAuthGuard], data: { authType: 'login' } },
  { path: 'register', component: AuthComponent, canActivate: [NotAuthGuard], data: { authType: 'register' } },
  { path: '', component: MainLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'c/all' },
      { path: 'c/create', component: CreatePostComponent, canActivate: [AuthGuard], data: { pageName: 'create-post' } },
      { path: 'c/:channelName', component: ChannelsComponent, data: { pageName: 'channel', createPost: true } },
      { path: 'c/:channelName/:postID', component: PostDetailsComponent, data: { pageName: 'post-details' } },
      { path: 'u/:username', component: ProfileComponent, data: { pageName: 'profile' } },
      { path: 'chat', component: ChatComponent, data: { pageName: 'chat' } }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
