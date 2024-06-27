import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  isSelected: boolean = false;
  @Input() project!: Project;

  constructor() {
  }

  ngOnInit()
  {
  }
}
