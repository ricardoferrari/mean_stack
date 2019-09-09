import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class PostService {
    
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient) {}

    getPosts() {
        this.http.get<{ message:string, posts:any }>('http://localhost:3000/posts')
            .pipe(map((postData) => {
                return postData.posts.map((post => {
                    return {
                        titulo: post.titulo,
                        conteudo: post.conteudo,
                        id: post._id
                    }
                }))
            }))
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts;
                this.postsUpdated.next([...this.posts]);
            });
        return [...this.posts];
    }

    getPost(id: string) {
        return {...this.posts.find(p => p.id === id)};
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(titulo: string, conteudo: string) {
        const post: Post = {id: null, titulo:titulo, conteudo: conteudo }
        this.http.post<{message: string, postId:string}>('http://localhost:3000/posts', post)
            .subscribe((responseData) => {
                post.id = responseData.postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    updatePost(id:string, titulo: string, conteudo: string) {
        const post: Post = {id: id, titulo: titulo, conteudo: conteudo}
        this.http.patch('http://localhost:3000/posts/'+id, post)
            .subscribe(response => {
                const postsAtualizados = [...this.posts];
                const indiceAtualizado = postsAtualizados.findIndex(p => p.id === post.id);
                postsAtualizados[indiceAtualizado] = post;
                this.posts = postsAtualizados;
                this.postsUpdated.next([...this.posts]);
            });
    }

    deletePost(postId:string) {
        this.http.delete('http://localhost:3000/posts/'+postId)
            .subscribe((resposta) => {
                console.log(resposta);
                const postsAtualizados = this.posts.filter(post =>  post.id !== postId);
                this.posts = postsAtualizados;
                this.postsUpdated.next([...this.posts]);
            });
    }
}