// TimeTableView.ts

import moment from "moment";
import type { DetailedReportItem, ProjectId } from "lib/toggl/TogglService";

type TimeEntry = {
  start: moment.Moment;
  end: moment.Moment;
  description: string;
  project_id: ProjectId;
};

type TimeTableEntry = {
  timeRange: string;
  description: string;
  projectId: ProjectId;
  color: string; // Assuming color is a string representing CSS color values
};

type TimeTableDay = {
  date: string; // Formatted date string
  entries: TimeTableEntry[];
};

type TimeTableWeek = {
  days: TimeTableDay[];
};

class TimeTableView {
  private timeTableWeek: TimeTableWeek;

  constructor(timeEntries: DetailedReportItem[], projects: ProjectsResponseItem[]) {
    this.timeTableWeek = this.createTimeTableWeek(timeEntries, projects);
  }

  private createTimeTableWeek(timeEntries: DetailedReportItem[], projects: ProjectsResponseItem[]): TimeTableWeek {
    const week: TimeTableWeek = { days: [] };

    // Group entries by day
    const entriesByDay = timeEntries.reduce((acc, entry) => {
      const day = moment(entry.start).format('YYYY-MM-DD');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry);
      return acc;
    }, {});

    // Create TimeTableDays
    for (const [day, entries] of Object.entries(entriesByDay)) {
      const dayEntries: TimeTableEntry[] = entries.map((entry) => {
        const project = projects.find(p => p.id === entry.project_id);
        return {
          timeRange: `${moment(entry.start).format('HH:mm')} - ${moment(entry.end).format('HH:mm')}`,
          description: entry.description,
          projectId: entry.project_id,
          color: project?.color || '#cccccc', // Default color if project color not found
        };
      });

      week.days.push({
        date: day,
        entries: dayEntries,
      });
    }

    return week;
  }

  public renderTimeTable() {
    // This method would be used in the Svelte component to access the timeTableWeek data and display it
    return this.timeTableWeek;
  }
}

export default TimeTableView;
