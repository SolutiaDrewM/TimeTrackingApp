import { Component } from '@angular/core';
import { SelectedProjectService } from '../../services/selected-project.service';
import { ProjectService } from '../../services/project.service';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';

@Component({
  selector: 'app-project-display',
  standalone: true,
  imports: [
    FormattedButtonComponent
  ],
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})
export class ProjectDisplayComponent {

  selectedProjectTitle: string | null = null;

  projectTitle: string = "";
  projectDescription: string = "";
  projectTotalHours: number = 0;

  constructor(
    private selectedProjectService: SelectedProjectService,
    private projectService: ProjectService
  ) {}

  ngOnInit(){
    this.selectedProjectService.selectedProject$.subscribe(project => {
      this.selectedProjectTitle = project;
      if(this.selectedProjectTitle !== null) {
        this.projectTitle = this.selectedProjectTitle;
        this.loadProject();
      }
    })
  }

  loadProject() {
    this.projectService.getProjectByTitle(this.projectTitle).subscribe(
      project => {
        this.projectDescription = project.description;
        this.projectTotalHours = project.totalHours
      }
    )
  }

}
