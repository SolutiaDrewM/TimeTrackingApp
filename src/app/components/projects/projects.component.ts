import { Component } from '@angular/core';
import { ProjectListComponent } from '../project-list/project-list.component';
import { CreateProjectComponent } from "../create-project/create-project.component";
import { ProjectDisplayComponent } from '../project-display/project-display.component';

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

export class ProjectsComponent {

}
