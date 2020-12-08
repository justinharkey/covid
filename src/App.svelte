<<<<<<< HEAD
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
=======
{#await getCovidData}
	<div class="status">Loading data...</div>
{:then data}
	<h1 class="graph__title">
		<CountySelector />
		<span class="graph__subtitle">New daily cases from March 3rd, 2020</span>
		<a id="graph__source" href="https://github.com/datadesk/california-coronavirus-data/blob/master/latimes-county-totals.csv">Source: LA Times</a>
	</h1>
	<Chart />
{:catch error}
	<div class="status">Unable to retrieve data.</div>
{/await}

<script lang="ts">
import Chart from './Chart.svelte';
import CountySelector from './CountySelector.svelte';
import { COUNTY_LIST } from './constants';
import { parsedData, selectedCounty } from './stores';
import type { ICounty } from './models/county';

/**
 * Checks if a pathname is present, if so checks to see if pathname matches county in county list. Updates Svelte store if there is a match.
 */
const setCountyByUrl = () => {
	const currentUrl: string = window.location.pathname.substr(1);
	if (currentUrl) {
		let filteredCounty: Array<ICounty> = COUNTY_LIST.counties.filter((county) => {
			return county.countySlug === currentUrl;
		});
		selectedCounty.set(filteredCounty[0].countyName);
	}
}

/**
 * Parses CSV data into an array.
 * @param {string} covidData - CSV data
 * @returns {array} Array with an array of parsed data.
 */
const parseCSVData = (covidData: string) => {
	// regex from https://gist.github.com/Jezternz/c8e9fafc2c114e079829974e3764db75
	const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
	let arrMatches = null, arrData = [[]];
	while (arrMatches = objPattern.exec(covidData)){
		if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
		arrData[arrData.length - 1].push(arrMatches[2] ? 
			arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
			arrMatches[3]);
	}
	parsedData.set(arrData);
	return arrData;
}
>>>>>>> a9e445bf0a7aff6a0402bfbeb86940296449b101

	setCountyByUrl();
	DataService.getData();

<<<<<<< HEAD
	$: {
		document.title = `${$selectedCounty} County - New Daily Coronavirus Cases`;
		DataService.filterSelectedCountyData($selectedCounty, $covidData);
=======
setCountyByUrl();

window.addEventListener('popstate', (event: PopStateEvent) => {
	if (event.state && event.state.selectedCountyName) {
		selectedCounty.set(event.state.selectedCountyName);
>>>>>>> a9e445bf0a7aff6a0402bfbeb86940296449b101
	}
</script>

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

<main>
	{#if !covidData}
		Loading data...
	{:else}
		<CountySelector />
		<Today data={$selectedCountyData} />
		<SevenDay data={$selectedCountyData} />
		<Trend data={$selectedCountyData} />
	{/if}
</main>
