import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:44338/api/Project'
  
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectTitles(): Observable<string[]> {
    return this.getProjects().pipe(
      map(projects => projects.map(project => project.title))
    );
  }

  getProjectByTitle(title: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/title/${title}`);
  }

  addProject(project: Project): Observable<Project> {
    //post to database
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project) {
    return null;
  }
  
  deleteProject(project: Project) {
    //return this.http.delete<Project>(this.apiUrl, project.projectId);
  }
}
