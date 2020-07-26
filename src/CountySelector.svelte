<select bind:value={selectedCountyName} on:change={updateSelectedCounty}>
    {#each $countyList as county}
        <option value={county[0]}>{county[0]} County</option>
    {/each}
</select>

<script lang="ts">
import { parsedData, selectedCounty, countyList } from './stores.js';

$: selectedCountyName = $selectedCounty;

/**
 * Updates history, document title, and store upon user selection of a new county.
 * @param {object} event - event object
 */
const updateSelectedCounty = (event) => {
    history.pushState({'selectedCountyName': event.target.value}, '', `/${event.target.value.replace(/ /g, '-').toLowerCase()}`);
    document.title = `${event.target.value} County - New Daily Coronavirus Cases`;
    selectedCounty.set(event.target.value);
}
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