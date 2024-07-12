import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-project-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    FormattedButtonComponent
  ],
  templateUrl: './update-project-dialog.component.html',
  styleUrl: './update-project-dialog.component.css'
})
export class UpdateProjectDialogComponent {
  updateProjectForm: FormGroup;
  @Output() updateEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateProjectForm = this.fb.group({
      projectTitle: [data.title, Validators.required],
      projectDescription: [data.description, Validators.required],
      projectTotalHours: [data.totalHours, [Validators.required, Validators.min(0)]]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.updateProjectForm.valid) {
      this.dialogRef.close(this.updateProjectForm.value);
    }
  }
}
