import { Component, Input } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectItemComponent, NgFor, NgForOf],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

}
