import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Aula MEAN';
  postsStored: Post[] = [];

  onpostCriado(post) {
    this.postsStored.push(post);
  }
}
