import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    MatFormField, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.css'
})
export class TimeInputComponent {
  titleInputValue: string = '';
  projectTitles: string[] = [];
  filteredTitles: string[] = [];
  dropdownVisible: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectTitles = this.getProjectTitles();
  }

  getProjectTitles() {
    return this.projectService.getProjects().map(project => project.title);

    //For later use of an observable
    /*this.myService.getItems().subscribe(items => {
      this.items = items;
    }); */
  }

  showSuggestions(): void {
    if (this.titleInputValue) {
      this.filteredTitles = this.projectTitles.filter(title =>
        title.toLowerCase().includes(this.titleInputValue.toLowerCase())
      );
      this.dropdownVisible = true;
    } else {
      this.filteredTitles = [];
      this.dropdownVisible = false;
    }
  }

  selectOption(option: string): void {
    this.titleInputValue = option;
    this.filteredTitles = [];
    this.dropdownVisible = false;
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

}
