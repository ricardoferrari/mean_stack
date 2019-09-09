import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from './../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public post: Post;
  private mode = 'create';
  private postId: string;
  private isLoading: boolean = false;

  constructor(private postService:PostService, public route: ActivatedRoute) { }

  onSavePost(form: NgForm) {
    if (form.invalid) { return; }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.titulo,form.value.conteudo);
    } else {
      this.postService.updatePost(this.postId,form.value.titulo,form.value.conteudo);
    }

    form.resetForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
        .subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, titulo: postData.titulo, conteudo: postData.conteudo};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

}
