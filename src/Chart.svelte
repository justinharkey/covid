<canvas id="covidChart"></canvas>

<script lang="ts">
import { beforeUpdate, afterUpdate } from 'svelte';
import Chart from 'chart.js';
import { DATE, NEW_CONFIRMED_CASES, START_DATE } from './constants';
import { parsedData, selectedCounty } from './stores';

let covidChart;
let limit: number = 0;
let selectedCountyData: Array<string> = [];
let labelData: Array<string> = [];
let datasetData: Array<string> = [];
let colors: Array<string> = [];

/**
 * Filters array data based on user selected county.
 * @param {array} data - Array of parsed data.
 */
const filterSelectedCountyData = (data: Array<string>) => {
    selectedCountyData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes($selectedCounty)) {
            selectedCountyData.push(data[i]);
        }
    }
    selectedCountyData = selectedCountyData.reverse();
}

/**
 * Destroys chart and resets all data variables.
 */
const resetChart = () => {
    if (covidChart) {
        covidChart.destroy();
    }

    limit = 0;
    labelData = [];
    datasetData = [];
    colors = [];
}

/**
 * Sets limit by looping through parsed data array and finding the highest value. Adds a 5% margin.
 */
const setLimit = () => {
    selectedCountyData.forEach((dailyData) => {
        if (dailyData[DATE] > START_DATE) {
            if (parseInt(dailyData[NEW_CONFIRMED_CASES], 10) > ( limit * 1.05 )) {
                limit = Math.ceil(parseInt(dailyData[NEW_CONFIRMED_CASES], 10) * 1.05);
            }
        }
    });
}

/**
 * Formats data arrays for labelData, datasetData, and colors.
 * @param {array} selectedCountyData - Array of county data.
 */
const formatData = () => {
    selectedCountyData.forEach((dailyData) => {
        if (dailyData[DATE] > START_DATE) {
            labelData.push(dailyData[DATE].substring(5).replace(/-/g, ' / '));
            datasetData.push(dailyData[NEW_CONFIRMED_CASES]);
            colors.push(`#${getDataColor( parseInt(dailyData[NEW_CONFIRMED_CASES], 10) )}`);
        }
    });
}

/**
 * Dynamically assigns color value based on its percentage of limit.
 * @param {number} newCases - New cases.
 * @returns {string} Returns hexadecimal color value.
 */
const getDataColor = (newCases: number) => {
    const dataPercentage: number = ( newCases / limit ) * 100;
    let color: string;
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

/**
 * Creates chart using ChartJS.
 */
const createChart = () => {
    filterSelectedCountyData($parsedData);

    setLimit();

    formatData();

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
                        suggestedMax: limit,
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

beforeUpdate(resetChart);

afterUpdate(createChart);
</script>