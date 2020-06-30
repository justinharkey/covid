<canvas id="covidChart"></canvas>

<style>
#covidChart {
    width: 100%;
    height: 100%;
}
</style>

<script>
import { afterUpdate } from 'svelte';
import Chart from 'chart.js';

export let data;

let covidChart;
let limit = 0;

let dailyNumbers = [];

const getDailyNumbers = (data) => {
    for (let i = 51; i < data[0].length; i++) {
        dailyNumbers.push(data[0][i] - data[0][i - 1]);
    }
}

const setLimit = (dailyNumbers) => {
    dailyNumbers.forEach(dailyData => {
        // if (dailyData[0] > '2020-03-02') {
        //     if (parseInt(dailyData[5], 10) > ( limit )) {
        //         limit = (parseInt(dailyData[5], 10));
        //     }
        // }
        if (parseInt(dailyData, 10) > ( limit )) {
            limit = (parseInt(dailyData, 10));
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

    let labelData = [];
    let datasetData = [];
    let colors = [];

    getDailyNumbers(data);

    setLimit(dailyNumbers);

    dailyNumbers.forEach((dailyData, i) => {
        // if (dailyData[0] > '2020-03-02') {
            // labelData.push(dailyData[0].substring(5).replace(/-/g, ' / '));
            labelData.push(i);
            datasetData.push(dailyData);
            colors.push(`#${getDataColor(dailyData)}`);
        // }
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