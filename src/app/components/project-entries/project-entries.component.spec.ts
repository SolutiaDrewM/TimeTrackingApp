import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEntriesComponent } from './project-entries.component';

describe('ProjectEntriesComponent', () => {
  let component: ProjectEntriesComponent;
  let fixture: ComponentFixture<ProjectEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
