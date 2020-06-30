<h1 class="graph__title">
	Los Angeles County<span class="graph__subtitle">New daily cases from March 3rd, 2020</span>
	<a id="graph__source" href="https://github.com/datadesk/california-coronavirus-data/blob/master/latimes-county-totals.csv">Source: LA Times</a>
</h1>

{#await getCovidData}
	<div class="status">Loading data...</div>
{:then data}
	<Chart data={data} />
{:catch error}
	<div class="status">Unable to retrieve data.</div>
{/await}

<script>
	import Chart from './Chart.svelte';

	// const getCountyList = (data) => {
	// 	let countyList = [];
	// 	// start at index 1 so we skip the CSV label
	// 	for (let i = 1; i < data.length; i++) {
	// 		let countyName = data[i][1];
	// 		if (countyList.indexOf(countyName) === -1 && countyName !== undefined) {
	// 			countyList.push(countyName);
	// 		}
	// 	}
	// 	return countyList;
	// }

	const parseLosAngelesDataToArray = (parsedData) => {
		const losAngelesDataArray = [];
		for (let i = 0; i < parsedData.length; i++) {
			if (parsedData[i][5].includes('Los Angeles')) {
				losAngelesDataArray.push(parsedData[i]);
				break;
			}
		}
		return losAngelesDataArray;
	}

	const parseCSVData = (covidData) => {
		// blatantly stolen from https://gist.github.com/Jezternz/c8e9fafc2c114e079829974e3764db75
		const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
		let arrMatches = null, arrData = [[]];
		while (arrMatches = objPattern.exec(covidData)){
			if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
			arrData[arrData.length - 1].push(arrMatches[2] ? 
				arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
				arrMatches[3]);
		}
		// getCountyList(arrData);
		console.log(arrData);
		return parseLosAngelesDataToArray(arrData);
	}

	const getCovidData = (async() => {
		// const response = await fetch(`https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/latimes-county-totals.csv`);
		const response = await fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv`, { cache: 'force-cache' });
		const covidData = await response.text();
		return await parseCSVData(covidData);
	})();
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