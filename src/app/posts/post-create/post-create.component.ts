import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredConteudo = 'Inclua seu conteudo';
  enteredTitulo = 'Meu post';
  @Output() postCriado = new EventEmitter<Post>();

  constructor() { }

  onAddPost() {
    const post: Post = {
      titulo: this.enteredTitulo,
      conteudo: this.enteredConteudo
    }
    this.postCriado.emit(post);
  }

  ngOnInit() {
  }

}
