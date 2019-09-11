import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from './../post.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  imagePreview: string;
  public post: Post;
  private mode = 'create';
  private postId: string;
  private isLoading: boolean = false;


  constructor(private postService:PostService, public route: ActivatedRoute) { }
  onSavePost() {
    if (this.form.invalid) { return; }
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.titulo,this.form.value.conteudo);
    } else {
      this.postService.updatePost(this.postId,this.form.value.titulo,this.form.value.conteudo);
    }

    this.form.reset();
  }

  onImagePicker(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({imagem: file});
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'titulo': new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.min(3)
        ]
      }),
      'conteudo': new FormControl(null, 
        {
          validators: [Validators.required]
        }),
      'imagem': new FormControl(null, 
        {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
        .subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, titulo: postData.titulo, conteudo: postData.conteudo};
          this.form.setValue({
            'titulo': this.post.titulo,
            'conteudo': this.post.conteudo 
          })
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

}
