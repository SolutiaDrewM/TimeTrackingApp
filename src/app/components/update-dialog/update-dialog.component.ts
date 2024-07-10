import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    FormattedButtonComponent
  ],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})
export class UpdateDialogComponent {
  updateForm: FormGroup;
  @Output() updateEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.fb.group({
      taskTitle: [data.title, Validators.required],
      taskDescription: [data.description, Validators.required],
      taskHours: [data.hours, [Validators.required, Validators.min(0)]]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.updateForm.valid) {
      this.dialogRef.close(this.updateForm.value);
    }
  }
}
