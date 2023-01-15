import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../post.service';

import { PostModel } from '../post-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  faComments = faComments;
  keyword!: string;
  product!: string;
  Posts!: PostModel[];
  selectedCheckbox!: number[];
  

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private router: Router) {

                this.activateRoute.params.subscribe(param=>{
                  this.keyword=param['keyword'];
                  this.product=param['product'];
                  this.ngOnInit();
                })

  }



  ngOnInit(): void {
    
    if(this.keyword!='null')
      this.getPostByKeyword();
    
    else
      this.getPostByProduct();
  
    
    this.selectedCheckbox= new Array<number>();
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  private getPostByKeyword() {
    this.postService.getPostByKeyword(this.keyword, this.product).subscribe(data => {
      this.Posts = data;
    }, error => {
      throwError(error);
    });
  }

  private getPostByProduct() {
    this.postService.getPostByProduct(this.product).subscribe(data => {
      this.Posts = data;
      console.log("reached");
      
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
      if(this.keyword!='null'){
        this.getPostByKeyword();
        }
        else{
          this.getPostByProduct();
        }
    })

    this.selectedCheckbox=new Array<number>(); 
    
  }




}
