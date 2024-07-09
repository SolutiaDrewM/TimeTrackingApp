import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    FormattedButtonComponent,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  
  createProjectForm: FormGroup = new FormGroup<any>({});


  constructor(private fb: FormBuilder, private projectService: ProjectService) {

  }

  ngOnInit() {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      totalHours: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    })
  }

  onSubmit() {
    //Post new project to the database using project service
    //Make the project here (id=0) and give it to the service to post
    let project: Project = {
      projectId: 0,
      title: this.createProjectForm.value.title,
      totalHours: this.createProjectForm.value.totalHours,
      description: this.createProjectForm.value.description
    }

    this.projectService.addProject(project).subscribe(
      project => console.log(project)
    );
  }
}
