export interface TimeEntry {
    taskId: number,
    projectId: number,
    userId: number,
    title: string,
    hours: number,
    description: string,
    User: {} | null,
}
