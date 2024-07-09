import { Injectable } from '@angular/core';
import { TimeEntry } from '../interfaces/time-entry';
import { Observable, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/project';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {
  private apiUrl = 'https://localhost:44338/api/Task'
  private projectApiUrl = 'https://localhost:44338/api/Project'

  constructor(private http: HttpClient) {}

  getProjectByTitle(title: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectApiUrl}/title/${title}`);
  }

  getEntries(projectTitle: string): Observable<TimeEntry[]> {
    //Get the project Id from the title
    //Return observable with time entries from that project Id
    return this.getProjectByTitle(projectTitle).pipe(
      switchMap(project => this.http.get<TimeEntry[]>(`${this.apiUrl}/projectId/${project.projectId}`))
    );

  }

  updateEntry(id: number, projectTitle: string, username: string, hours: number) {
    //logic to update this entry 
  }

  deleteEntry(id: number) {
    //logic to delete entry at id
  }

  //TODO Add in description
  addEntry(projectTitle: string, title: string, userId: number, hours: number): Observable<TimeEntry> {
    return this.getProjectByTitle(projectTitle).pipe(
      map(project => project.projectId),
      switchMap(projectId => {
        const newTimeEntry: TimeEntry = {
          taskId: 0,
          projectId: projectId,
          userId: userId,
          title: title,
          description: "",
          hours: hours,
          User: null
        };
        return this.http.post<TimeEntry>(this.apiUrl, newTimeEntry);
      })
    );
    
    
  }
}
