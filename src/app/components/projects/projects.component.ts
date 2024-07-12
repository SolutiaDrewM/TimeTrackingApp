import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from '../project-list/project-list.component';
import { CreateProjectComponent } from "../create-project/create-project.component";
import { ProjectDisplayComponent } from '../project-display/project-display.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';
import { SelectedProjectService } from '../../services/selected-project.service';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [
        ProjectListComponent,
        CreateProjectComponent,
        ProjectDisplayComponent
    ]
})

export class ProjectsComponent implements OnInit{

    projects: Project[] = [];
    selectedProjectTitle: string | null = null;
    noProjectSelected: boolean = true;
    project: Project = {
        projectId: 0,
        title: '',
        totalHours: 0,
        description: ''
    };


    constructor(
        private selectedProjectService: SelectedProjectService,
        private projectService: ProjectService
    ) {}

    ngOnInit() {
        this.loadProjects();
        this.selectedProjectService.selectedProject$.subscribe(projectTitle => {
            this.selectedProjectTitle = projectTitle;
            if(this.selectedProjectTitle !== null) {
                this.project.title = this.selectedProjectTitle;
                this.noProjectSelected = false;
                this.loadProject();
            } else {
                this.project.title = "Please select a project"
                this.project.totalHours = 999;
            }
        })
    }

    loadProject() {
        this.projectService.getProjectByTitle(this.project.title).subscribe(
            project => {
                this.selectedProjectTitle = project.title;
                this.project.projectId = project.projectId;
                this.project.description = project.description;
                this.project.totalHours = project.totalHours;
            }
        )
    }

    createProject(project: Project) {
        this.projectService.addProject(project).subscribe({
            next: (response) => {
                this.loadProjects(); // refresh after update
                this.project.title = project.title;
                this.loadProject()
            },
            error: (error) => {
                console.log(error);
                alert('The entry was not created succesfully');
            }
        })
    }

    updateProject(project: Project): void {
        this.projectService.updateProject(project).subscribe({
            next: (response) => {
                this.loadProjects(); // refresh after update
                this.project.title = project.title;
                this.loadProject()
            },
            error: (error) => {
                alert('The entry was not updated succesfully');
            }
        })
    }
    
    deleteProject(project: Project): void {
        this.projectService.deleteProject(project.projectId).subscribe(() => {
            this.loadProjects(); //refresh list after deletion
            this.project.title = this.projects[0].title
            this.loadProject()
        })
    }

    loadProjects(): void {
        this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }
}
