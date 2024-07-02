import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, FormattedButtonComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  
  createProjectForm: FormGroup = new FormGroup<any>({});


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      hours: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    })
  }

  onSubmit() {
    //Post new project to the database using project service
    console.log('Form Data: ', this.createProjectForm.value);
  }
}
