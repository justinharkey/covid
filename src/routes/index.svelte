<script lang="ts">
	import { createClient } from '@supabase/supabase-js';
	import { countyData } from '../stores';
	import Chart from 'chart.js/auto/auto.js';
	import { onMount } from 'svelte';
	import { SupabaseService } from '../constants';

	let dailyCasesChart;
	const supabase = createClient(SupabaseService.hostname, SupabaseService.publicKey);

	const formatData = (rawData) => {
		let formattedData = [];

		rawData.forEach((day, i) => {
			if (i === 0) {
				formattedData.push(day);
			} else {
				formattedData.push({
					date: day.date,
					cases: day.cases - rawData[i - 1].cases,
					deaths: day.deaths - rawData[i - 1].deaths,
				});
			}
		})

		return formattedData;
	}

	const getData = async () => {
		const { data, error } = await supabase.from('us_counties_cases').select('date, cases, deaths').gt('date', '2020-03-02').eq('fips', 6037).order('date', { ascending: true });

		if (error) {
			console.error(error);
		}

		const formattedData = formatData(data);

		countyData.set(formattedData);
	}

	const getDailyCases = () => {
		let casesData = [];
		$countyData.forEach((day) =>  {
			casesData.push(day.cases);
		});
		return casesData;
	}

	const getTodayCases = () => {
		const dailyCases = getDailyCases();
		return dailyCases[dailyCases.length - 1];
	}

	const getHighestDay = () => {
		return Math.max(...getDailyCases());
	}

	const getLabels = () => {
		let labels = [];
		$countyData.map((daily) => {
			labels.push(daily.date);
		});
		return labels;
	}

	const getDataColor = () => {
		const limit = getHighestDay();
		const cases = getDailyCases();
		let dataColors = [];

		cases.map((daily) => {
			const dataPercentage = ( daily / limit ) * 100;
			let color;

			if (dataPercentage <= 10) {
				color = '#2c699a';
			} else if (dataPercentage <= 20) {
				color = '#048ba8';
			} else if (dataPercentage <= 30) {
				color = '#0db39e';
			} else if (dataPercentage <= 40) {
				color = '#16db93';
			} else if (dataPercentage <= 50) {
				color = '#83e377';
			} else if (dataPercentage <= 60) {
				color = '#b9e769';
			} else if (dataPercentage <= 70) {
				color = '#efea5a';
			} else if (dataPercentage <= 80) {
				color = '#f1c453';
			} else if (dataPercentage <= 90) {
				color = '#f29e4c';
			} else {
				color = '#ad2e24';
			}

			dataColors.push(color);
		});

    return dataColors;
}

	const getSevenDayAverage = (previousPeriod?: boolean) => {
		const dailyCases = getDailyCases();
		const startingCount = previousPeriod ? 8 : 1;
		const endingCount = previousPeriod ? 15 : 8;

		let dailyCount = 0;
		for (let i = startingCount; i < endingCount; i++) {
			dailyCount += dailyCases[dailyCases.length - i];
		}
		return Math.floor(dailyCount / 7);
	}

	const getChart = () => {
		const ctx = document.getElementById('dailyCasesChart');

		const chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: getLabels(),
				datasets: [{
					label: 'Daily New Cases',
					data: getDailyCases(),
					backgroundColor: getDataColor(),
					borderWidth: 0,
					barPercentage: 1.0,
					categoryPercentage: 1.0
				}]
			},
			options: {
				maintainAspectRatio: false,
				scales: {
					y: {
						suggestedMax: getHighestDay(),
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							beginAtZero: true,
							display: false
						}
					},
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							display: false
						}
					}
				},
				plugins : {
					legend: {
						display: false,
					}
				}
			}
		});
	}

	getData();

	onMount(async () => {
		getChart();
	})
</script>

{#if $countyData}
<main class="page">
	<section class="county">
		<h1 class="county__title">Los Angeles</h1>
		<a class="county__source" href="https://github.com/nytimes/covid-19-data" target="_blank">Data Source</a>
	</section>

	<section class="daily">
		<h2 class="daily__title">New Cases Today</h2>
		<p class="daily__count">{getTodayCases().toLocaleString()}</p>
		<p class="daily__highest">Highest Day {getHighestDay().toLocaleString()}</p>
	</section>

	<section class="weekly">
		<h2 class="daily__title">7 Day Average</h2>
		<p class="weekly__average">
			{getSevenDayAverage().toLocaleString()}
			<svg class={`weekly__average__trend weekly__average__trend--${getSevenDayAverage() <= getSevenDayAverage(true) ? 'down' : 'up'}`}>
				<use xlink:href={`/icons.svg#${getSevenDayAverage() <= getSevenDayAverage(true) ? 'trendingDown' : 'trendingUp'}`}/>
			</svg>
		</p>
		<p class="weekly__previous">Previous Period: {getSevenDayAverage(true).toLocaleString()}</p>
	</section>

	<section class="chart">
		<canvas bind:this={dailyCasesChart} id="dailyCasesChart" />
	</section>
</main>
{/if}

<style>
	:global(body) {
		font-family: 'Work Sans', Arial, Helvetica, sans-serif;
		font-weight: 400;
		padding: 14px;
	}
	h1, h2 {
		margin: 0;
		padding: 0;
	}
	p {
		margin: 0;
		padding: 0;
	}
	.page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.county, .daily, .weekly {
		margin-bottom: 18px;
	}
	.county__title {
		font-weight: 600;
		font-size: 36px;
	}
	.county__source {
		font-size: 12px;
		text-decoration: none;
		color: #069;
		margin-top: -2px;
		display: block;
		width: 100px;
	}
	.daily__title,
	.weekly__title {
		font-weight: 500;
		font-size: 18px;
	}
	.daily__count,
	.weekly__average {
		font-weight: 600;
		font-size: 40px;
		margin: 2px 0;
	}
	.daily__count {
		color: #ad2e24;
	}
	.daily__highest,
	.weekly__previous {
		font-size: 14px;
		color: #777;
	}
	.weekly__average__trend {
		width: 24px;
		height: 24px;
		color: #2c699a;
	}
	.weekly__average__trend--up {
		color: #ad2e24;
	}
	.chart {
		position: relative;
		flex: 1;
	}
	#dailyCasesChart {
		width: 100%;
		height: 100%;
	}
</style>