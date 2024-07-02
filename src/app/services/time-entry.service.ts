import { Injectable } from '@angular/core';
import { TimeEntry } from '../interfaces/time-entry';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  entries: TimeEntry[] = [
    {
      id: 1,
      projectTitle: 'Project 1',
      username: 'drewmore',
      hours: 4
    },
    {
      id: 2,
      projectTitle: 'Project 2',
      username: 'billybob',
      hours: 6
    },
    {
      id: 3,
      projectTitle: 'Project 3',
      username: 'drewmore2',
      hours: 7
    },
    {
      id: 4,
      projectTitle: 'Project 1',
      username: 'drewmore',
      hours: 8
    },
    {
      id: 5,
      projectTitle: 'Project 5',
      username: 'drewmore',
      hours: 6
    },
    {
      id: 6,
      projectTitle: 'Project 1',
      username: 'jimmy',
      hours: 6
    },
    {
      id: 7,
      projectTitle: 'Project 1',
      username: 'billybob',
      hours: 6
    },
    {
      id: 8,
      projectTitle: 'Project 2',
      username: 'drewmore',
      hours: 6
    },
  ];

  constructor() {
  }

  getEntries(projectTitle: string): Observable<TimeEntry[]> {
    return of(this.entries.filter(entry => entry.projectTitle === projectTitle));
  }

  updateEntry(id: number, projectTitle: string, username: string, hours: number) {
    //logic to update this entry 
  }

  deleteEntry(id: number) {
    //logic to delete entry at id
  }

  createTimeEntry(projectTitle: string, username: string, hours: number) {
    this.entries.concat({
      id: 134,
      projectTitle: projectTitle,
      username: username,
      hours: hours
    })
  }
}
