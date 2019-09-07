import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
    
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient) {}

    getPosts() {
        this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
            });
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(titulo: string, conteudo: string) {
        const post: Post = {id: null, titulo:titulo, conteudo: conteudo }
        this.http.post<{message: string}>('http://localhost:3000/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }
}