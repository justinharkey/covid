<script lang="ts">
  export let data;

  $: getSevenDayAverage = (start: number, end: number) => {
    let sevenDayAverage: number = 0;
    if (data.dailyDetails && data.dailyDetails.length > 0) {
      for (let i = start; i <= end; i++) {
        sevenDayAverage +=
          data.dailyDetails[data.dailyDetails.length - i].reportedCases -
          data.dailyDetails[data.dailyDetails.length - i - 1].reportedCases;
      }
    }
    return Math.round(sevenDayAverage / 7);
  };
</script>

<div class="count count--sevenDay">
  <h1 class="count__title">7 day average</h1>
  <p class="count__count">{getSevenDayAverage(1, 7).toLocaleString()}</p>
  <p class="count__subtitle">
    Previous Period:
    {getSevenDayAverage(8, 14).toLocaleString()}
  </p>
</div>
