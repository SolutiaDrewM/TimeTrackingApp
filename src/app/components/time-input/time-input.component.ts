import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatButtonModule,
    FormattedButtonComponent
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

  getTitleInput(): string {
    return this.taskForm.value.title;
  }

  setTitleInput(title: string) {
    this.taskForm.value.title = title;
  }

  //Functions for the dropdown menu
  showSuggestions(): void {
    if (this.getTitleInput()) {
      this.filteredTitles = this.projectTitles.filter(title =>
        title.toLowerCase().includes(this.getTitleInput().toLowerCase())
      );
      this.dropdownVisible = true;
    } else {
      this.dropdownVisible = false;
    }
  }

  /**
   * There are two titles being set here
   * This is because we need to set the text of the input box
   * as well as setting the title stored in the form group
   */
  selectOption(option: string): void {
    this.setTitleInput(option);
    this.titleInputValue = option;
    this.dropdownVisible = false;
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

}
