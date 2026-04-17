import { Component, OnInit } from '@angular/core';
import { TaskService, CommentItem } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {
  comments: CommentItem[] = [];
  isLoading = false;
  errorMessage = '';
  selectedComments: Set<number> = new Set();

  // Paginación
  readonly itemsPerPage = 50;
  currentPage = 1;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  get commentsCount(): number {
    return this.comments.length;
  }

  get totalPages(): number {
    return Math.ceil(this.commentsCount / this.itemsPerPage);
  }

  get paginatedComments(): CommentItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.comments.slice(startIndex, endIndex);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.commentsCount);
  }

  loadComments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments;
        this.currentPage = 1;
        this.selectedComments.clear();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar los comentarios.';
        this.isLoading = false;
      }
    });
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (!this.isFirstPage) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleSelect(id: number): void {
    if (this.selectedComments.has(id)) {
      this.selectedComments.delete(id);
    } else {
      this.selectedComments.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedComments.has(id);
  }

  toggleSelectAll(): void {
    const pageIds = this.paginatedComments.map(c => c.id);
    const allSelected = pageIds.every(id => this.selectedComments.has(id));

    if (allSelected) {
      pageIds.forEach(id => this.selectedComments.delete(id));
    } else {
      pageIds.forEach(id => this.selectedComments.add(id));
    }
  }

  isAllSelected(): boolean {
    return this.paginatedComments.length > 0 && 
           this.paginatedComments.every(c => this.selectedComments.has(c.id));
  }

  deleteSelected(): void {
    this.selectedComments.forEach(id => {
      const index = this.comments.findIndex(c => c.id === id);
      if (index > -1) {
        this.comments.splice(index, 1);
      }
    });
    this.selectedComments.clear();
  }

  onCommentAdded(newComment: CommentItem): void {
    this.comments.unshift(newComment);
    this.currentPage = 1;
  }
}
