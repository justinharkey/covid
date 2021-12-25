<script lang="ts">
  export let data;

  import { DataService } from "./services/dataService";

  $: getTodayCount = () => {
    let todayCount: number = 0;
    todayCount =
      data.dailyDetails && data.dailyDetails.length > 0
        ? data.dailyDetails[data.dailyDetails.length - 1].reportedCases -
          data.dailyDetails[data.dailyDetails.length - 2].reportedCases
        : 0;
    return todayCount;
  };
</script>

<div class="count count--today">
  <h1 class="count__title">New cases today</h1>
  <p class="count__count">{getTodayCount().toLocaleString()}</p>
  <h2 class="count__subtitle">
    Highest day:
    {DataService.getHighestDayCount(data).toLocaleString()}
  </h2>
</div>
