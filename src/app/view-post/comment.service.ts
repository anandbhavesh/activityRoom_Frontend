import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment-Payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-post/' + postId);
  }

  postComment(formData: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/comments/', formData,{ responseType: 'text' });
  }

  
}