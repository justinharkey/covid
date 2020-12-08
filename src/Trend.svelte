<script lang="ts">
    export let data;

    import { DATE, NEW_CONFIRMED_CASES, START_DATE } from "./constants";
    import { DataService } from "./services/dataService";

    let limit: number = 0;
    let counts: Array<string> = [];
    let colors: Array<string> = [];

    /**
     * Destroys chart and resets all data variables.
     */
    const resetChart = () => {
        limit = 0;
        counts = [];
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
    const formatData = (countyData) => {
        countyData.forEach((dailyData) => {
            if (dailyData[DATE] > START_DATE) {
                counts.push(dailyData[NEW_CONFIRMED_CASES]);
                colors.push(
                    `#${getDataColor(
                        parseInt(dailyData[NEW_CONFIRMED_CASES], 10)
                    )}`
                );
            }
        });
    };

    $: {
        resetChart();
        setLimit(data);
        formatData(data);
    }
</script>

<style>
    .trend {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        margin-top: 10px;
    }
</style>

<div class="count count--trend">
    <h1 class="count__title">Trend From March 3rd, 2020</h1>
    <div class="trend">
        {#each counts as count, index}
            <div
                class="trend__day"
                style={`width: ${100 / counts.length}%; height: ${(parseInt(count, 10) / limit) * 100}%; background-color: ${colors[index]}`} />
        {/each}
    </div>
</div>
