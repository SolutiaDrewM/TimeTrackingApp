import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from "../project-list/project-list.component";
import { CreateProjectComponent } from "../create-project/create-project.component";
import { ProjectEntriesComponent } from "../project-entries/project-entries.component";
import { Project } from '../../interfaces/project';
import { SelectedProjectService } from '../../services/selected-project.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-time-entry',
    standalone: true,
    templateUrl: './time-entry.component.html',
    styleUrl: './time-entry.component.css',
    imports: [
        ProjectListComponent,
        CreateProjectComponent,
        ProjectEntriesComponent,
        NgIf
    ]
})
export class TimeEntryComponent implements OnInit {
    selectedProject: string | null = null;

    constructor(private selectedProjectService: SelectedProjectService) {}

    ngOnInit(): void {
        this.selectedProjectService.selectedProject$.subscribe(project => {
            this.selectedProject = project;
            this.updateProjectEntries();
        })
    }

    updateProjectEntries(): void {
        //Logic to rerender the ProjectEntriesComponent with the selected project
    }
}
