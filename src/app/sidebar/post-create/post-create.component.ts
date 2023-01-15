import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { CreatePostPayload } from './create-post-payload';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload: CreatePostPayload;
  Products =[{name:"Sahera 60Hz Platform" },{name:"Cyrus-series 1" },{name:"Cyrus-series 2" },{name:"Gyasi-138M HH "},{name:"Gyasi-190M HH"},{name:"Olympus 6-MW Platform" } ];
  
  

  constructor(private router: Router, private postService: PostService,
    ) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      segment: '',
      product: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      segment: new FormControl('', Validators.required),
      url: new FormControl(''),
      description: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
    });
    
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.segment = this.createPostForm.get('segment')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;
    this.postPayload.product = this.createPostForm.get('product')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/view-post/' + data.id);
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}



