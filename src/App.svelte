<canvas id="covidData"></canvas>
{#await getCovidData}
	<div class="status">Loading data...</div>
{:then data}
	<!-- <main id="graph">
		<h1 class="graph__title">Los Angeles County<span class="graph__subtitle">New Daily Cases, 90 Days</span><a id="graph__source" href="https://github.com/datadesk/california-coronavirus-data/blob/master/latimes-county-totals.csv">Source: LA Times</a></h1>
		<div id="graph__marker--quarter">
			{Math.round(limit * .75)}
		</div>
		<div id="graph__marker--half">
			{Math.round(limit * .50)}
		</div>
		<div id="graph__marker--threequarter">
			{Math.round(limit * .25)}
		</div>
		{#each data as dailyData}
			<div class={`dailyData ${getAdditionalClass(dailyData[0])}`} id={`dailyData--${dailyData[0]}`} style={`width: ${getDataWidth()}%;`}>
				<span class="dailyData__date">{dailyData[0]}</span>
				<div class="dailyData__data" style={`height: ${getDataHeight(dailyData[5])}%; background-color: #${getDataColor(dailyData[5])};`}>
					{#if (dailyData[5] > 30)}
						<span class="dailyData__dataCount">{dailyData[5]}</span>
					{/if}
				</div>
			</div>
		{/each}
	</main> -->
	<canvas id="covidData"></canvas>
{:catch error}
	<div class="status">Unable to retrieve data.</div>
{/await}

<script>
	import Chart from 'chart.js';
	
	const createChart = (data) => {
		let labelData = [];
		let datasetData = [];
		let colors = [];

		data.forEach(dailyData => {
			labelData.push(dailyData[0]);
			datasetData.push(dailyData[5]);
			colors.push(`#${getDataColor(dailyData[5])}`);
		});

		console.log(colors);

		const ctx = document.getElementById('covidData');
		const covidData = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labelData,
				datasets: [{
					label: 'Daily New Cases',
					data: datasetData,
					backgroundColor: colors,
					borderWidth: 0
				}]
			},
			options: {
				
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	let limit = 2000;
	// let dataCount;
	const dataCount = 90;

	const parseLosAngelesDataToArray = (parsedData) => {
		const losAngelesDataArray = [];
		for (let i = 0; i < parsedData.length; i++) {
			if (parsedData[i].includes('Los Angeles') && parsedData[i][0] > '0') {
				// set upper limit for y-axis if higher than previous limit (with 15% padding)
				if (parseInt(parsedData[i][5], 10) > ( limit / 1.15 )) {
					limit = (parseInt(parsedData[i][5], 10) * 1.15);
				}
				losAngelesDataArray.push(parsedData[i]);
			}
		}
		// dataCount = losAngelesDataArray.length;
		createChart(losAngelesDataArray.reverse().slice(`-${dataCount}`));
		// return losAngelesDataArray;
	}

	const parseCovidDataToArray = (covidData) => {
		// blatantly stolen from https://gist.github.com/Jezternz/c8e9fafc2c114e079829974e3764db75
		const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
		let arrMatches = null, arrData = [[]];
		while (arrMatches = objPattern.exec(covidData)){
			if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
			arrData[arrData.length - 1].push(arrMatches[2] ? 
				arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
				arrMatches[3]);
		}
		return parseLosAngelesDataToArray(arrData);
	}

	const getCovidData = (async() => {
		// https://github.com/datadesk/california-coronavirus-data/blob/master/latimes-county-totals.csv
		// const response = await fetch(`//3.21.153.161/covid/latimes-county-totals.csv`);
		const response = await fetch(`https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/latimes-county-totals.csv`);
		const covidData = await response.text();
		return await parseCovidDataToArray(covidData);
	})();

	const getDataWidth = () => {
		return ( 1 / dataCount ) * 100;
	}

	const getDataHeight = (newCases) => {
		return ( newCases / limit ) * 100;
	}

	const getDataColor = (newCases) => {
		const dataHeightPercentage = getDataHeight(newCases);
		let color;
		if (dataHeightPercentage <= 10) {
			color = 'ffba08';
		} else if (dataHeightPercentage <= 20) {
			color = 'faa307';
		} else if (dataHeightPercentage <= 30) {
			color = 'f48c06';
		} else if (dataHeightPercentage <= 40) {
			color = 'e85d04';
		} else if (dataHeightPercentage <= 50) {
			color = 'dc2f02';
		} else if (dataHeightPercentage <= 60) {
			color = 'd00000';
		} else if (dataHeightPercentage <= 70) {
			color = '9d0208';
		} else if (dataHeightPercentage <= 80) {
			color = '6a040f';
		} else if (dataHeightPercentage <= 90) {
			color = '370617';
		} else {
			color = '03071e';
		}
		return color;
	}

	const getAdditionalClass = (date) => {
		const month = date.split('-')[1];
		return month % 2 === 0 ? `` : `dailyData--odd`;
	}
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
	#graph {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		box-sizing: border-box;
		border: 1px solid #ddd;
		position: relative;
		min-width: 1200px;
	}
	.graph__title {
		position: fixed;
		margin: 0;
		padding: 10px 14px;
		top: 9px;
		left: 9px;
		font-size: 18px;
		font-weight: bold;
		z-index: 3;
		background-color: #fff;
		border-radius: 2px;
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
	#graph__marker--quarter,
	#graph__marker--half,
	#graph__marker--threequarter {
		position: absolute;
		width: 100%;
		height: 1px;
		background: #eee;
		z-index: 0;
		top: 25%;
		left: 0;
		font-size: 12px;
		color: #ccc;
	}
	#graph__marker--half {
		top: 50%;
	}
	#graph__marker--threequarter {
		top: 75%;
	}
	.dailyData {
		float: left;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		font-size: 10px;
		font-weight: bold;
		position: relative;
		z-index: 0;
	}
	.dailyData--odd {
		background: rgba( 0,0,0,0.04 );
	}
	.dailyData__date {
		color: #e0e0e0;
		padding-top: 6px;
	}
	.dailyData__data {
		background-color: #e76f51;
		position: relative;
		box-shadow: inset 0 0 0 1px #fff;
		width: 100%;
		display: block;
	}
	.dailyData__dataCount {
		font-size: 10px;
		font-weight: bold;
		top: 4px;
		left: 50%;
		transform: translateX( -50% );
		position: absolute;
		text-align: left;
		display: block;
		width: 34px;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#covidData {
		width: 100%;
		height: 100%;
	}
</style>