import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService, CommentItem } from '../api.service';

@Component({
  selector: 'app-comentarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css'
})
export class ComentariosComponent implements OnInit {
  comments: CommentItem[] = [];
  formData = {
    name: '',
    comment: ''
  };

  isLoading = false;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  get commentsCount(): number {
    return this.comments.length;
  }

  submitComment(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const name = this.formData.name.trim();
    const comment = this.formData.comment.trim();

    if (!name || !comment) {
      this.errorMessage = 'Completa todos los campos antes de enviar.';
      return;
    }

    this.isSaving = true;

    this.apiService.createComment({ name, body: comment }).subscribe({
      next: (response) => {
        const createdComment: CommentItem = {
          ...response,
          id: response.id ?? Date.now(),
          name,
          body: comment,
          createdAt: new Date().toLocaleString('es-ES')
        };

        this.comments = [createdComment, ...this.comments];
        this.successMessage = 'Comentario registrado correctamente.';
        this.formData = { name: '', comment: '' };
        this.isSaving = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo registrar el comentario. Intenta nuevamente.';
        this.isSaving = false;
      }
    });
  }

  private loadComments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar los comentarios.';
        this.isLoading = false;
      }
    });
  }
}
