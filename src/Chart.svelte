<canvas id="covidChart"></canvas>

<script>
import { afterUpdate } from 'svelte';
import Chart from 'chart.js';
import { countyTotals } from './constants.js';
import { parsedData, selectedCounty } from './stores.js';

let covidChart;
let limit = 0;
let selectedCountyData = [];

const filterSelectedCountyData = (data) => {
        selectedCountyData = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].includes($selectedCounty)) {
				selectedCountyData.push(data[i]);
			}
		}
		selectedCountyData = selectedCountyData.reverse();
	}

const setLimit = (selectedCountyData) => {
    limit = 0;
    selectedCountyData.forEach(dailyData => {
        if (dailyData[countyTotals.date] > '2020-03-02') {
            if (parseInt(dailyData[countyTotals.newConfirmedCases], 10) > ( limit * 1.05 )) {
                limit = (parseInt(dailyData[countyTotals.newConfirmedCases], 10) * 1.05);
            }
        }
    });
}

const getDataColor = (newCases) => {
    const dataPercentage = ( newCases / limit ) * 100;
    let color;
    if (dataPercentage <= 10) {
        color = 'ffba08';
    } else if (dataPercentage <= 20) {
        color = 'faa307';
    } else if (dataPercentage <= 30) {
        color = 'f48c06';
    } else if (dataPercentage <= 40) {
        color = 'e85d04';
    } else if (dataPercentage <= 50) {
        color = 'dc2f02';
    } else if (dataPercentage <= 60) {
        color = 'd00000';
    } else if (dataPercentage <= 70) {
        color = '9d0208';
    } else if (dataPercentage <= 80) {
        color = '6a040f';
    } else if (dataPercentage <= 90) {
        color = '370617';
    } else {
        color = '03071e';
    }
    return color;
}

const createChart = () => {
    if (covidChart) {
        covidChart.destroy();
    }

    filterSelectedCountyData($parsedData);

    setLimit(selectedCountyData);

    let labelData = [];
    let datasetData = [];
    let colors = [];

    selectedCountyData.forEach(dailyData => {
        if (dailyData[countyTotals.date] > '2020-03-02') {
            labelData.push(dailyData[countyTotals.date].substring(5).replace(/-/g, ' / '));
            datasetData.push(dailyData[countyTotals.newConfirmedCases]);
            colors.push(`#${getDataColor(dailyData[countyTotals.newConfirmedCases])}`);
        }
    });

    const ctx = document.getElementById('covidChart');
    covidChart = new Chart(ctx, {
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
            legend: {
                display: false
            },
            tooltips: {
                displayColors: false,
                xPadding: 16,
                yPadding: 10,
                cornerRadius: 5,
                borderColor: '#ddd',
                borderWidth: '1',
                backgroundColor: '#fff',
                bodyFontColor: '#323232',
                titleFontColor: '#323232',
                yAlign: 'bottom',
                callbacks: {
                    label: function(tooltipItem, data) {
                        let label = `Cases: ${tooltipItem.yLabel}`;
                        return label;
                    }
                }
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10,
                        mirror: true,
                        padding: -5
                    }
                }],
                xAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontSize: 10,
                        maxRotation: 60,
                        minRotation: 60
                    }
                }]
            }
        }
    });
}

afterUpdate(createChart);
</script>