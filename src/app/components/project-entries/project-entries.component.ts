import { Component, Input, OnInit } from '@angular/core';
import { MatHeaderCell, MatTable, MatTableModule } from '@angular/material/table';
import { Project } from '../../interfaces/project';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { TimeEntry } from '../../interfaces/time-entry';
import { TimeEntryService } from '../../services/time-entry.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Time } from '@angular/common';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';

@Component({
  selector: 'app-project-entries',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormattedButtonComponent
    ],
  templateUrl: './project-entries.component.html',
  styleUrl: './project-entries.component.css'
})
export class ProjectEntriesComponent {
  @Input() projectTitle: string | null | undefined;
  @Input() dataSource: TimeEntry[] = [];
  displayedColumns: string[] = ['username', 'hours', 'actions'];

  constructor(private timeEntryService: TimeEntryService) {

  }

  updateEntry(entry: TimeEntry) {

  }

  deleteEntry(entry: TimeEntry) {

  }

}
