import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredConteudo = 'Inclua seu conteudo';
  enteredTitulo = 'Meu post';
  @Output() postCriado = new EventEmitter();

  constructor() { }

  onAddPost() {
    const post = {
      titulo: this.enteredTitulo,
      conteudo: this.enteredConteudo
    }
    this.postCriado.emit(post);
  }

  ngOnInit() {
  }

}
