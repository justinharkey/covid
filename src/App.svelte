<script lang="ts">
  import { DataService } from "./services/dataService";
  import { covidData, selectedCounty, selectedCountyData } from "./stores";
  import Today from "./Today.svelte";
  import SevenDay from "./SevenDay.svelte";
  import Trend from "./Trend.svelte";
  import CountySelector from "./CountySelector.svelte";
  import { COUNTY_LIST } from "./constants";
  import type { ICounty } from "./models/county";

  /**
   * Checks if a pathname is present, if so checks to see if pathname matches county in county list. Updates Svelte store if there is a match.
   */
  const setCountyByUrl = () => {
    const currentUrl: string = window.location.pathname.substr(1);
    if (currentUrl) {
      let filteredCounty: Array<ICounty> = COUNTY_LIST.counties.filter(
        (county) => {
          return county.countySlug === currentUrl;
        }
      );
      selectedCounty.set(filteredCounty[0].countyName);
    }
  };

  window.addEventListener("popstate", (event: PopStateEvent) => {
    if (event.state && event.state.selectedCountyName) {
      selectedCounty.set(event.state.selectedCountyName);
    }
  });

  setCountyByUrl();
  DataService.getData();

  $: {
    document.title = `${$selectedCounty} County - New Daily Coronavirus Cases`;
    DataService.filterSelectedCountyData($selectedCounty, $covidData);
  }
</script>

<main>
  {#if !$covidData}
    Loading data...
  {:else}
    <CountySelector />
    <Today data={$selectedCountyData} />
    <SevenDay data={$selectedCountyData} />
    <Trend data={$selectedCountyData} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (min-width: 768px) {
    main {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
