import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedProjectService {

  private selectedProjectSubject = new BehaviorSubject<string | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();

  constructor() { }

  selectProject(projectTitle: string) {
    this.selectedProjectSubject.next(projectTitle);
  }
}
