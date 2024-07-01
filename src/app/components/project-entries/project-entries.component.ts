import { Component, Input, OnInit } from '@angular/core';
import { MatHeaderCell, MatTable, MatTableModule } from '@angular/material/table';
import { Project } from '../../interfaces/project';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { TimeEntry } from '../../interfaces/time-entry';
import { TimeEntryService } from '../../services/time-entry.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-entries',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatTableModule,
    MatIconModule,
    MatButtonModule
    ],
  templateUrl: './project-entries.component.html',
  styleUrl: './project-entries.component.css'
})
export class ProjectEntriesComponent implements OnInit {
  @Input() projectTitle: string | null | undefined;
  displayedColumns: string[] = ['username', 'hours', 'actions'];
  dataSource: TimeEntry[] = [];

  constructor(private timeEntryService: TimeEntryService) {

  }

  ngOnInit(): void {
    this.loadEntries
  }

  ngOnChanges(): void {
    this.loadEntries
  }

  loadEntries(): void {
    if (this.projectTitle) {
      this.timeEntryService.getEntries(this.projectTitle).subscribe((entries: TimeEntry[]) => {
        this.dataSource = entries;
      });
    }

    // if title is undefined or null, render the blank gray

    // else render the title and a table of entries
  }

updateEntry(entry: TimeEntry): void {

}

deleteEntry(entry: TimeEntry): void {

}

}
