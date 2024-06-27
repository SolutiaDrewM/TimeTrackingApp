import { Component } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projects = this.getProjects();
  }

  getProjects() {
    return this.projectService.getProjects();
    //For later use of an observable
    /*this.myService.getItems().subscribe(items => {
      this.items = items;
    }); */
  }
}
