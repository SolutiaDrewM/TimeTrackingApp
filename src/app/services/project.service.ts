import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[];
  
  constructor() {
    this.projects = [
      {
        title: "Project 1",
        hours: 20,
        description: "This project is all about doing angular stuff for funzies"
      },
      {
        title: "Project 2",
        hours: 125,
        description: "This project is all about doing angular stuff for funzies"
      },
      {
        title: "Project 3",
        hours: 5,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis dolore..."
      },
      {
        title: "Project 4",
        hours: 48,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis dolore..."
      },
      {
        title: "Project 5",
        hours: 5,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis dolore..."
      },
      {
        title: "Project 6",
        hours: 48,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis dolore..."
      },
    ]
  }

  getProjects() {
    return this.projects
  }
}
