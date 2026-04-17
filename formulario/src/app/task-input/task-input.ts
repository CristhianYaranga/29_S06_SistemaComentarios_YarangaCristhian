import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService, CommentItem } from '../task';

@Component({
  selector: 'app-task-input',
  standalone: false,
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInputComponent {
  @Output() commentAdded = new EventEmitter<CommentItem>();

  formData = {
    name: '',
    email: '',
    body: ''
  };

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private readonly taskService: TaskService) {}

  submitComment(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const name = this.formData.name.trim();
    const email = this.formData.email.trim();
    const body = this.formData.body.trim();

    if (!name || !email || !body) {
      this.errorMessage = 'Completa todos los campos antes de enviar.';
      return;
    }

    // Validar formato de email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Por favor ingresa un email válido.';
      return;
    }

    this.isSaving = true;

    this.taskService.createComment({ name, body }).subscribe({
      next: (response) => {
        const newComment: CommentItem = {
          id: response.id ?? Date.now(),
          name,
          body,
          email: email,
          createdAt: new Date().toLocaleString('es-ES')
        };
        
        this.successMessage = 'Comentario registrado correctamente.';
        this.formData = { name: '', email: '', body: '' };
        this.isSaving = false;
        this.commentAdded.emit(newComment);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'No se pudo registrar el comentario. Intenta nuevamente.';
        this.isSaving = false;
      }
    });
  }
}
