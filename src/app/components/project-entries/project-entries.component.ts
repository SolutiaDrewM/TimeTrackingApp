import { Component, Input } from '@angular/core';
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
  @Input() projectTitle: string | null | undefined;
  //selectedProject: Project;
  //timeEntryData: TimeEntry[];

  ngOnChanges(): void {
    this.renderEntries
  }

  renderEntries(): void {
    //Render entries based on projectTitle

    // if title is undefined or null, render the blank gray

    // else render the title and a table of entries
  }
}
