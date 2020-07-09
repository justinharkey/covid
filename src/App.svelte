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

<script>
import Chart from './Chart.svelte';
import CountySelector from './CountySelector.svelte';
import { parsedData, selectedCounty, countyList } from './stores.js';

/**
 * Checks if a pathname is present, if so checks to see if pathname matches county in county list. Updates Svelte store if there is a match.
 */
const setCountyByUrl = () => {
	const currentUrl = window.location.pathname.substr(1);
	if (currentUrl) {
		let filteredCounty = $countyList.filter((county) => county[1] === currentUrl)[0];
		selectedCounty.set(filteredCounty[0]);
	}
}

/**
 * Parses CSV data into an array.
 * @param {string} covidData - CSV data
 * @returns {array} Array with an array of parsed data.
 */
const parseCSVData = (covidData) => {
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

/**
 * Fetches CSV data.
 * @returns {Promise} Promise containing CSV data.
 */
const getCovidData = (async() => {
	const response = await fetch(`https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/latimes-county-totals.csv`, { cache: 'force-cache' });
	const covidData = await response.text();
	return await parseCSVData(covidData);
})();

setCountyByUrl();

window.addEventListener('popstate', (event) => {
	if (event.state && event.state.selectedCountyName) {
		selectedCounty.set(event.state.selectedCountyName);
	}
});

$: document.title = `${$selectedCounty} County - New Daily Coronavirus Cases`;
</script>

<style>
	.status {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		font-weight: bold;
	}
	.graph__title {
		position: fixed;
		margin: 0;
		padding: 12px 30px;
		top: 9px;
		left: 9px;
		font-size: 18px;
		font-weight: bold;
		z-index: 3;
		background-color: #fff;
		border-radius: 3px;
		box-shadow: 0 3px 10px rgba( 0,0,0,0.08 );
		border: 1px solid #eee;
	}
	.graph__subtitle {
		display: block;
		font-size: 12px;
		font-weight: normal;
	}
	#graph__source {
		color: #369;
		text-decoration: none;
		font-size: 10px;
		font-weight: normal;
		display: block;
		margin: 0;
		padding: 0;
	}
</style>