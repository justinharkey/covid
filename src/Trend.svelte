<script lang="ts">
  import { START_DATE } from "./constants";

  export let data;

  import { DataService } from "./services/dataService";

  let limit: number = 0;
  let counts: Array<number> = [];
  let colors: Array<string> = [];

  /**
   * Destroys chart and resets all data variables.
   */
  const resetChart = () => {
    limit = 0;
    counts = [];
    colors = [];
  };

  /**
   * Sets limit based on highest value.
   */
  const setLimit = (countyData) => {
    limit = DataService.getHighestDayCount(countyData);
  };

  /**
   * Dynamically assigns color value based on its percentage of limit.
   * @param {number} newCases - New cases.
   * @returns {string} Returns hexadecimal color value.
   */
  const getDataColor = (newCases: number) => {
    const dataPercentage: number = (newCases / limit) * 100;
    let color: string;
    if (dataPercentage <= 10) {
      color = "2c699a";
    } else if (dataPercentage <= 20) {
      color = "048ba8";
    } else if (dataPercentage <= 30) {
      color = "0db39e";
    } else if (dataPercentage <= 40) {
      color = "16db93";
    } else if (dataPercentage <= 50) {
      color = "83e377";
    } else if (dataPercentage <= 60) {
      color = "b9e769";
    } else if (dataPercentage <= 70) {
      color = "efea5a";
    } else if (dataPercentage <= 80) {
      color = "f1c453";
    } else if (dataPercentage <= 90) {
      color = "f29e4c";
    } else {
      color = "ad2e24";
    }
    return color;
  };

  /**
   * Formats data arrays for labelData, counts, and colors.
   * @param {array} countyData - Array of county data.
   */
  const formatChartData = (countyData) => {
    if (countyData.dailyDetails && countyData.dailyDetails.length > 0) {
      for (let i = 0; i < countyData.dailyDetails.length; i++) {
        const currentDayCount =
          i > 0
            ? countyData.dailyDetails[i].reportedCases -
              countyData.dailyDetails[i - 1].reportedCases
            : 0;
        if (countyData.dailyDetails[i].date > START_DATE) {
          counts.push(currentDayCount);
          colors.push(`#${getDataColor(currentDayCount)}`);
        }
      }
    }
  };

  $: {
    resetChart();
    if (data) {
      setLimit(data);
      formatChartData(data);
    }
  }
</script>

<div class="count count--trend">
  <h1 class="count__title">Trend From March 3rd, 2020</h1>
  <div class="trend">
    {#each counts as count, index}
      <div
        class="trend__day"
        style={`width: ${100 / counts.length}%; height: ${
          (count / limit) * 100
        }%; background-color: ${colors[index]}`}
      />
    {/each}
  </div>
</div>

<style>
  .trend {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
  }
</style>
