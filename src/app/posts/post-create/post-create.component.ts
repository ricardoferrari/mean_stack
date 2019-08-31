import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from './../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService:PostService) { }

  onAddPost(form: NgForm) {
    if (form.invalid) { return; }
    this.postService.addPost(form.value.titulo,form.value.conteudo);
    form.resetForm();
  }

  ngOnInit() {
  }

}
