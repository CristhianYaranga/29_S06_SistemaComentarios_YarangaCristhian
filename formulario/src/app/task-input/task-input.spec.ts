import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInput } from './task-input';

describe('TaskInput', () => {
  let component: TaskInput;
  let fixture: ComponentFixture<TaskInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskInput],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
