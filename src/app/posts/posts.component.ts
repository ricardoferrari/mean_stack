import { PageEvent } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material';
import { PostService } from './post.service';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  private isLoading: boolean = true;
  private postSubs: Subscription;
  posts: Post[] = [];
  currentPage = 1;
  totalPosts = 10;
  postsPerPage = 2;
  postSizeOptions = [1,2,5,10];
  @ViewChild('paginador', {static: false}) paginador: MatPaginator;

  constructor(private postService: PostService) { }

  onDelete(postId: string) {
      this.isLoading = true;
      this.postService.deletePost(postId).subscribe( () => {
        //Caso seja o ultimo item da pagina volta uma pagina
        if ( ( ( (this.currentPage-1) * this.postsPerPage ) + 1 ) >= this.totalPosts ) {
          if ( this.paginador.hasPreviousPage()) this.paginador.previousPage();
        }
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onPageChanged(pageData: PageEvent) {
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnInit() {
    this.postSubs = this.postService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], total: number}) => {
      this.posts = postData.posts;
      this.totalPosts = postData.total;
      this.isLoading = false;
    });
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
  }

}
