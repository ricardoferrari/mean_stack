import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient, private router: Router) {}

    getPosts() {
        this.http.get<{ message:string, posts:any }>('http://localhost:3000/posts')
            .pipe(map((postData) => {
                return postData.posts.map((post => {
                    return {
                        titulo: post.titulo,
                        conteudo: post.conteudo,
                        id: post._id,
                        imagePath: post.imagePath
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
        return this.http.get<{ _id: string; titulo: string; conteudo: string }>(
            "http://localhost:3000/posts/" + id
        );
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(titulo: string, conteudo: string, image: File) {
        const postData = new FormData();
        postData.append('titulo', titulo);
        postData.append('conteudo', conteudo);
        postData.append('image', image);
        this.http.post<{message: string, post:Post}>('http://localhost:3000/posts', postData)
            .subscribe((responseData) => {
                const post: Post = {
                    id: responseData.post.id, 
                    titulo: titulo, 
                    conteudo: conteudo,
                    imagePath: responseData.post.imagePath
                };
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    updatePost(id:string, titulo: string, conteudo: string) {
        const post: Post = {id: id, titulo: titulo, conteudo: conteudo, imagePath: null}
        this.http.patch('http://localhost:3000/posts/'+id, post)
            .subscribe(response => {
                const postsAtualizados = [...this.posts];
                const indiceAtualizado = postsAtualizados.findIndex(p => p.id === post.id);
                postsAtualizados[indiceAtualizado] = post;
                this.posts = postsAtualizados;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
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