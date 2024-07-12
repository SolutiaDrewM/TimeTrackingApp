import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';
import { TimeEntryService } from '../../services/time-entry.service';
import { UserService } from '../../services/user.service';

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
  user$ = this.userService.userSubject.asObservable();


  constructor(
    private projectService: ProjectService,
    private timeEntryService: TimeEntryService,
    private userService: UserService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.getProjectTitles();
    this.filteredTitles = this.projectTitles;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      task: ['', Validators.required],
      hours: ['', [Validators.required, Validators.min(0)]]
    })
  }

  //TODO, Make this not use the deprecated stuff
  getProjectTitles() {
    this.projectService.getProjectTitles().subscribe(
      (titles: string[]) => {
        this.projectTitles = titles;
      },
      (error) => {
        console.error('Error fetching project titles', error);
      }
    );
  }

  onSubmit(): void {
    let form = this.taskForm.value;
    let userId: number = 0;
    this.user$.subscribe(u => userId = u.userId);
    this.timeEntryService.addEntry(
      form.title,
      form.task,
      userId, 
      form.hours
    ).subscribe({
      next: () => {
        this.taskForm.reset();
      },
      error: (error) => {
        alert('The form was not submitted');
        console.error(error);
      }
    })


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
