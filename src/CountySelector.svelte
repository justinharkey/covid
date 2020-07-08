<select bind:value={selectedCountyName} on:change={updateSelectedCounty}>
    {#each $countyList as county}
        <option value="{county[0]}">{county[0]} County</option>
    {/each}
</select>

<script>
import { countyTotals } from './constants.js';
import { parsedData, selectedCounty, countyList } from './stores.js';

// let countyList = [];
$: selectedCountyName = $selectedCounty;

const updateSelectedCounty = (event) => {
    history.pushState({'selectedCountyName': event.target.value}, '', `/${event.target.value.replace(/ /g, '-').toLowerCase()}`);
    document.title = `${event.target.value} County - New Daily Coronavirus Cases`;
    selectedCounty.set(event.target.value);
}

// const getCountyList = (data) => {
//     // start at index 1 so we skip the CSV label
//     for (let i = 1; i < data.length; i++) {
//         let countyName = data[i][countyTotals.county];
//         if (countyList.indexOf(countyName) === -1 && countyName !== undefined) {
//             countyList.push(countyName);
//         }
//     }
// }

// getCountyList($parsedData);
</script>

<style>
select {
    font-size: 18px;
	font-weight: bold;
    margin: 0;
    padding: 3px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-bottom: 4px;
}
</style>