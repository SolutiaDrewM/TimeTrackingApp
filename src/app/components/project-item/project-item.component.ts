import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project';
import { NgForOf } from '@angular/common';
import { SelectedProjectService } from '../../services/selected-project.service';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent implements OnInit {
  selected: boolean = false;
  @Input() project!: Project;

  constructor(private selectedProjectService: SelectedProjectService) {
  }

  ngOnInit(): void {
    this.selectedProjectService.selectedProject$.subscribe(selectedProject => {
      this.selected = this.project.title === selectedProject;
    })
  }

  selectProject(): void {
    this.selectedProjectService.selectProject(this.project.title);
  }
}
