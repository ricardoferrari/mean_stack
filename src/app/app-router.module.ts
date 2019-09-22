import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'cria', component: PostCreateComponent},
    { path: 'edita/:postId', component: PostCreateComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class MainRouter {}