import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from './comment-Payload';
import { CommentService } from './comment.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  @ViewChild("inputFile", {static: false})
  inputFile!: ElementRef;

  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  comments!: CommentPayload[];
  File:File|null=null;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = +this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('',Validators.required),
      to: new FormControl('')
    });
    
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }


  fileUploaded(event:any){
  this.File = event.target.files[0];
  }


  postComment() {

    let formData= new FormData();

    formData.append("to", this.commentForm.get('to')?.value);
    formData.append("comments", this.commentForm.get('text')?.value);
    formData.append("postId", ''+this.postId);

    if(this.File!=null)
    {
    formData.append("file",this.File );
    }
   
      this.commentService.postComment(formData).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.commentForm.get('to')?.setValue('');
      this.inputFile.nativeElement.value = "";
      this.File=null;
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    }, error => {
      throwError(error);
    });

  }

}
