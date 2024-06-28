import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
  ],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.css'
})
export class TimeInputComponent {

  //Empty form with no controls to please the compiler
  taskForm: FormGroup = new FormGroup<any>({});

  titleInputValue: string = '';
  projectTitles: string[] = [];
  filteredTitles: string[] = [];
  dropdownVisible: boolean = false;

  projectTitle: string = '';


  constructor(private projectService: ProjectService, private fb: FormBuilder) {}

  ngOnInit() {
    this.projectTitles = this.getProjectTitles();
    this.filteredTitles = this.projectTitles;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      task: ['', Validators.required],
      hours: ['', [Validators.required, Validators.min(0)]]
    })
  }

  getProjectTitles(): string[] {
    return this.projectService.getProjects().map(project => project.title);

    //For later use of an observable
    /*this.myService.getItems().subscribe(items => {
      this.items = items;
    }); */
  }

  onSubmit(): void {
    console.log('Form Data: ', this.taskForm.value);
  }

  getTitleInput() {
    
  }

  //Functions for the dropdown menu
  showSuggestions(): void {
    if (this.titleInputValue) {
      this.filteredTitles = this.projectTitles.filter(title =>
        title.toLowerCase().includes(this.titleInputValue.toLowerCase())
      );
      this.dropdownVisible = true;
    } else {
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
