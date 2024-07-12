import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from "../project-list/project-list.component";
import { CreateProjectComponent } from "../create-project/create-project.component";
import { ProjectEntriesComponent } from "../project-entries/project-entries.component";
import { Project } from '../../interfaces/project';
import { SelectedProjectService } from '../../services/selected-project.service';
import { NgIf } from '@angular/common';
import { TimeEntry } from '../../interfaces/time-entry';
import { TimeEntryService } from '../../services/time-entry.service';
import { ProjectService } from '../../services/project.service';

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
    selectedProjectTitle: string | null = null;
    projects: Project[] = [];
    dataSource: TimeEntry[] = [];

    constructor(
        private selectedProjectService: SelectedProjectService,
        private projectService: ProjectService,
        private timeEntryService: TimeEntryService
    ) {}

    ngOnInit(): void {
        this.selectedProjectService.selectedProject$.subscribe(project => {
            this.selectedProjectTitle = project;
            this.loadEntries();
        })
        this.loadProjects();
        
    }   
    
    ngOnChanges(): void {
        this.loadEntries();
    }
    
    loadEntries(): void {
        if (this.selectedProjectTitle) {
            this.timeEntryService.getEntries(this.selectedProjectTitle).subscribe((entries: TimeEntry[]) => {
                this.dataSource = entries;
            });
        }
    }
    
    loadProjects(): void {
        this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }

    updateEntry(entry: TimeEntry): void {
        this.timeEntryService.updateEntry(entry).subscribe({
            next: (response) => {
                this.loadEntries(); // refresch after update
            },
            error: (error) => {
                alert('The entry was not updated succesfully');
            }
        })
    }
    
    deleteEntry(entry: TimeEntry): void {
        this.timeEntryService.deleteEntry(entry.taskId).subscribe(() => {
            this.loadEntries(); //refresh list after deletion
        })
    }
}
