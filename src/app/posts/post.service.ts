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
    private postsUpdated = new Subject<{posts: Post[], total: number}>();

    constructor(private http:HttpClient, private router: Router) {}

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{ message:string, posts:any, totalPosts: number }>('http://localhost:3000/posts' + queryParams)
            .pipe(map((postData) => {
                return { 
                    posts: postData.posts.map((post => {
                        return {
                            titulo: post.titulo,
                            conteudo: post.conteudo,
                            id: post._id,
                            imagePath: post.imagePath
                        }
                    })),
                    total: postData.totalPosts
                }
            }))
            .subscribe((transformedPostsData) => {
                this.posts = transformedPostsData.posts;
                this.postsUpdated.next({posts: [...this.posts], total: transformedPostsData.total});
            });
        return [...this.posts];
    }

    getPost(id: string) {
        return this.http.get<{
                                _id: string; 
                                titulo: string; 
                                conteudo: string;
                                imagePath: string;
                            }>(
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
        postData.append('image', image, titulo);
        this.http.post<{message: string, post:Post}>('http://localhost:3000/posts', postData)
            .subscribe((responseData) => {
                this.router.navigate(["/"]);
            });
    }

    updatePost(id:string, titulo: string, conteudo: string, image: File | string) {
        let postData: Post | FormData;
        console.log(typeof(image));
        if (typeof image === "object") {
            postData = new FormData();
            postData.append('id', id);
            postData.append('titulo', titulo);
            postData.append('conteudo', conteudo);
            postData.append('image', image, titulo);
        } else {
            postData = { 
                id: id, 
                titulo: titulo, 
                conteudo: conteudo, 
                imagePath: image 
            };
        }
        this.http.patch('http://localhost:3000/posts/'+id, postData)
            .subscribe(response => {
                this.router.navigate(["/"]);
            });
    }

    deletePost(postId:string) {
        return this.http.delete('http://localhost:3000/posts/'+postId);
    }
}