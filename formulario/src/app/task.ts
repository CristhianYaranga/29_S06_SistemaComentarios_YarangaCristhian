import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommentItem {
  id: number;
  name: string;
  body: string;
  email?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private readonly http: HttpClient) {}

  getComments(): Observable<CommentItem[]> {
    return this.http.get<CommentItem[]>(this.apiUrl);
  }

  createComment(payload: Pick<CommentItem, 'name' | 'body'>): Observable<CommentItem> {
    return this.http.post<CommentItem>(this.apiUrl, {
      postId: 1,
      name: payload.name,
      body: payload.body,
      email: 'usuario@demo.com'
    });
  }
}
