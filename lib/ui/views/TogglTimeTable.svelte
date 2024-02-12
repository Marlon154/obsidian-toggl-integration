<!-- TimeTableView.svelte -->

<script lang="ts">
  import TimeTableView from "./TimeTableView";
  import type {
    DetailedReportItem,
    ProjectsResponseItem,
  } from "lib/toggl/TogglService";

  // Props passed from parent component
  export let timeEntries: DetailedReportItem[];
  export let projects: ProjectsResponseItem[];

  // Instantiate the TimeTableView class
  const timeTableView = new TimeTableView(timeEntries, projects);

  // Reactive statement to update the timetable when entries or projects change
  $: timeTableWeek = timeTableView.renderTimeTable();
</script>

<div class="timetable">
  {#each timeTableWeek.days as day}
    <div class="timetable-day">
      <h3>{day.date}</h3>
      {#each day.entries as entry}
        <div class="timetable-entry" style="background-color: {entry.color};">
          <span class="time">{entry.timeRange}</span>
          <span class="description">{entry.description}</span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .timetable {
    /* Add your CSS styles for the timetable here */
  }
  /* Additional styles */
</style>
