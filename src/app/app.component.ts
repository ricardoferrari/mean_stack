import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aula MEAN';
  postsStored = [];
  onpostCriado(post) {
    this.postsStored.push(post);
  }
}
