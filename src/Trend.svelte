<script lang="ts">
  export let data;

  import { START_DATE } from "./constants";
  import { DataService } from "./services/dataService";

  let limit: number = 0;
  let counts: Array<number> = [];
  let dates: Array<string> = [];
  let colors: Array<string> = [];

  /**
   * Destroys chart and resets all data variables.
   */
  const resetChart = () => {
    limit = 0;
    counts = [];
    dates = [];
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
          dates.push(countyData.dailyDetails[i].date);
        }
      }
    }
  };

  $: {
    resetChart();
    setLimit(data);
    formatChartData(data);
    getBarElements();
  }

  const addHover = (event) => {
    if (!event.target.classList.contains("hover")) {
      event.target.classList.add("hover");
    }
    event.preventDefault();
  };

  const removeHover = (event) => {
    if (event.target.classList.contains("hover")) {
      event.target.classList.remove("hover");
    }
    event.preventDefault();
  };

  const getBarElements = () => {
    const barElements: Element[] = Array.from(
      document.getElementsByClassName("trend__day")
    );
    console.log("barElements", barElements);
    const matrix = barElements.map((element: HTMLDivElement) => {
      return {
        top: element.offsetTop,
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        bottom: element.offsetTop + element.offsetHeight,
        e: element,
      };
    });
    console.log("matrix", matrix);
  };

  const handleTouch = (e) => {
    console.log(e.touches[0]);
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (
      element.classList.contains("trend__day") &&
      !element.classList.contains("hover")
    ) {
      element.classList.add("hover");
    }
    if (
      element.classList.contains("trend__day") &&
      element.classList.contains("hover")
    ) {
      element.classList.remove("hover");
    }
  };
</script>

<div class="count count--trend">
  <h1 class="count__title">Trend From March 3rd, 2020</h1>
  <div class="trend" on:touchmove={handleTouch}>
    <div class="trend__yTick trend__yTick--25">
      {Math.round(limit * 0.25).toLocaleString()}
    </div>
    <div class="trend__yTick trend__yTick--50">
      {Math.round(limit * 0.5).toLocaleString()}
    </div>
    <div class="trend__yTick trend__yTick--75">
      {Math.round(limit * 0.75).toLocaleString()}
    </div>
    <div class="trend__yTick">{limit.toLocaleString()}</div>
    {#each counts as count, index}
      <div
        class="trend__day"
        style={`width: ${100 / counts.length}%; height: ${Math.round(
          (count / limit) * 100
        )}%; background-color: ${colors[index]}`}
        on:mouseenter={addHover}
        on:mouseleave={removeHover}
      >
        <div
          class={(counts.length / index) * 100 < 50
            ? `trend__dayDetails`
            : `trend__dayDetails trend__dayDetails--shifted`}
        >
          {new Date(dates[index]).toLocaleDateString()}<br />
          <span class="trend__dayDetailsMeta">Cases:</span>
          {counts[index].toLocaleString()}
        </div>
      </div>
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
    position: relative;
    z-index: 1;
  }
  .trend__yTick {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translateY(-50%);
    font-size: 12px;
    color: #aaa;
    width: 100%;
    text-align: left;
  }
  .trend__yTick::after {
    content: "";
    display: block;
    width: calc(100% - 40px);
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 50%;
    margin-left: 40px;
  }
  .trend__yTick--25 {
    top: 75%;
  }
  .trend__yTick--50 {
    top: 50%;
  }
  .trend__yTick--75 {
    top: 25%;
  }
  .trend__dayDetails {
    position: absolute;
    top: 0;
    display: none;
    opacity: 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.4;
    width: 100px;
    border: 1px solid #aaa;
    border-radius: 6px;
    padding: 4px 8px;
    background: #fff;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.16);
    font-weight: 700;
  }
  .trend__dayDetailsMeta {
    font-weight: 400;
  }
  .trend__dayDetails--shifted {
    transform: translateX(-100%);
  }
  /* .trend__day:hover .trend__dayDetails, */
  :global(.trend__day.hover .trend__dayDetails) {
    display: block;
    opacity: 1;
    transition: all 200ms;
  }
  .trend__day.hover {
    background-color: black !important;
  }
</style>
