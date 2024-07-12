import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    FormattedButtonComponent
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  
  createProjectForm: FormGroup;
  @Output() updateEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProjectComponent>,
  ) {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      totalHours: ['', [Validators.required, Validators.min(0)]]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.createProjectForm.valid) {
      this.dialogRef.close(this.createProjectForm.value);
    }
  }
}
