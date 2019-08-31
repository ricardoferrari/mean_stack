import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  /* posts = [
    {titulo:"Abertura", conteudo:"Meu primeiro post"},
    {titulo:"Segundo", conteudo:"Meu segundo e preferido post"},
    {titulo:"Terceiro", conteudo:"O terceiro já é exageiro"}
  ]; */
  @Input() posts = [];

  constructor() { }

  ngOnInit() {
  }

}
