import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from './../post.model';
import { NgForm } from '@angular/forms';

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

  onAddPost(form: NgForm) {
    if (form.invalid) { return; }
    const post: Post = {
      titulo: form.value.titulo,
      conteudo: form.value.conteudo
    }
    this.postCriado.emit(post);
  }

  ngOnInit() {
  }

}
