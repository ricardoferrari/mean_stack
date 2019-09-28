import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'cria', component: PostCreateComponent, canActivate: [AuthGuard]},
    { path: 'edita/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthGuard ]
})
export class MainRouter {}