import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatHeaderCell, MatTable, MatTableModule } from '@angular/material/table';
import { Project } from '../../interfaces/project';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { TimeEntry } from '../../interfaces/time-entry';
import { TimeEntryService } from '../../services/time-entry.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-project-entries',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormattedButtonComponent,
    UpdateDialogComponent,
    RouterModule,
    NgIf,
    ],
  templateUrl: './project-entries.component.html',
  styleUrl: './project-entries.component.css'
})
export class ProjectEntriesComponent {
  @Input() projectTitle: string | null | undefined;
  @Input() dataSource: TimeEntry[] = [];
  @Output() deleteEntryEvent = new EventEmitter<TimeEntry>();
  @Output() updateEntryEvent = new EventEmitter<TimeEntry>();
  displayedColumns: string[] = ['username', 'hours', 'actions'];
  user$ = this.userService.userSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openUpdateDialog(entry: TimeEntry): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '50%',
      data: entry
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let updatedEntry = {
          taskId: entry.taskId,
          projectId: entry.projectId,
          userId: entry.userId,
          title: result.taskTitle,
          description: result.taskDescription,
          hours: result.taskHours,
          User: {}
        }
        this.updateEntryEvent.emit(updatedEntry);
      }
    })
  }

  userIsAdmin(): boolean {
    let adminUser:  boolean = false;
    this.user$.subscribe(u => adminUser = (u.role.type === "admin"));
    return adminUser;
  }

  deleteEntry(entry: TimeEntry) {
    this.deleteEntryEvent.emit(entry);
  }

  navigateToInput() {
    this.router.navigate(['/time-input'])
  }

}
