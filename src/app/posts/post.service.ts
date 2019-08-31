import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
    
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(titulo: string, conteudo: string) {
        const post: Post = { titulo:titulo, conteudo: conteudo }
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}