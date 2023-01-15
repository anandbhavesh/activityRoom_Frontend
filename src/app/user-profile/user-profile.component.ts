import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  faComments = faComments;
  username: string;
  Posts!: PostModel[];
  selectedCheckbox!: number[];
  

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private router: Router) {
    this.username=this.activateRoute.snapshot.params['name'];

  }

  ngOnInit(): void {
    this.getPostByUsername();
    this.selectedCheckbox= new Array<number>();
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  private getPostByUsername() {
    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.Posts = data;
    }, error => {
      throwError(error);
    });
  }

  

  getCheckboxId(event:any, id: number ){
      if(event.target.checked){
         this.selectedCheckbox.push(id);
      }
      else{
       this.selectedCheckbox = this.selectedCheckbox.filter(data=>data!=id);
      }

  }

  
  PostDelete(){
    
    this.postService.postDelete(this.selectedCheckbox).subscribe(data =>{
      this.getPostByUsername();
    })

    this.selectedCheckbox=new Array<number>(); 
    
  }


}
