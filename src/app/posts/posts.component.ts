import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
