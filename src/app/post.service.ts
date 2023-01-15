import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from './sidebar/post-create/create-post-payload';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  
  

  constructor(private http: HttpClient) { }

  createPost(postPayload: CreatePostPayload) : Observable<PostModel>{
    return this.http.post<PostModel>('http://localhost:8080/api/posts/', postPayload);
  }

  postDelete(id: number[]): Observable<any>{
    return this.http.post('http://localhost:8080/api/posts/delete/', id ,{ responseType: 'text' });
  }


  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }

  getPostByProduct(product: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-Product/' + product);
  }

  getPostByKeyword(keyword: string, product: string): Observable<PostModel[]> {
    
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-keyword/' + keyword +'/'+ product);
  }



  

  

}