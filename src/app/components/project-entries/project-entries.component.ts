import { Component } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-project-entries',
  standalone: true,
  imports: [MatTable],
  templateUrl: './project-entries.component.html',
  styleUrl: './project-entries.component.css'
})
export class ProjectEntriesComponent {
  //selectedProject: Project;
  //timeEntryData: TimeEntry[];
}
