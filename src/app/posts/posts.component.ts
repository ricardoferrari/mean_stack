import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
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

  constructor(private postService: PostService) { }

  onDelete(postId: string) {
      this.postService.deletePost(postId);
  }

  ngOnInit() {
    this.postSubs = this.postService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postSubs.unsubscribe();
  }

}
