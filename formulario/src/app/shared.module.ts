import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TaskListComponent } from './task-list/task-list';
import { TaskInputComponent } from './task-input/task-input';

@NgModule({
  declarations: [TaskListComponent, TaskInputComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [TaskListComponent, TaskInputComponent]
})
export class SharedModule {}
