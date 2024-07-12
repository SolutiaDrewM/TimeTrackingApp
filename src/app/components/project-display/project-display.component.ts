import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedProjectService } from '../../services/selected-project.service';
import { ProjectService } from '../../services/project.service';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { Project } from '../../interfaces/project';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateProjectDialogComponent } from '../update-project-dialog/update-project-dialog.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-display',
  standalone: true,
  imports: [
    FormattedButtonComponent,
    MatDialogModule,
    UpdateProjectDialogComponent,
  ],
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})
export class ProjectDisplayComponent {

  @Input() project: Project = {
    projectId: 0,
    title: "",
    description: "",
    totalHours: 0,
  };

  @Output() updateProjectEvent = new EventEmitter<Project>();
  @Output() deleteProjectEvent = new EventEmitter<Project>();
  @Output() createProjectEvent = new EventEmitter<Project>();


  selectedProjectTitle: string | null = null;
  user$ = this.userService.userSubject.asObservable();

  constructor(
    private selectedProjectService: SelectedProjectService,
    private projectService: ProjectService,
    private userService: UserService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(){

  }

  userIsAdmin(): boolean {
    let adminUser: boolean = false;
    this.user$.subscribe(u => adminUser = (u.role.type === "admin"));
    return adminUser;
  }

  openUpdateDialog(project: Project): void {
    const dialogRef = this.dialog.open(UpdateProjectDialogComponent, {
      width: '60%',
      data: project
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let updatedProject = {
          projectId: project.projectId,
          title: result.projectTitle,
          description: result.projectDescription,
          totalHours: result.projectTotalHours,
        }
        this.updateProjectEvent.emit(updatedProject);
      }
    })
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '60%',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let createdProject = {
          projectId: 0,
          title: result.title,
          description: result.description,
          totalHours: result.totalHours,
        }
        this.createProjectEvent.emit(createdProject);
      }
    })
  }

  onDelete(project: Project) {
    this.deleteProjectEvent.emit(project);
  }

  onCreate() {
    this.createProjectEvent.emit();
  }

}
