<select bind:value={selectedCountyName} on:change={updateSelectedCounty}>
    {#each COUNTY_LIST.counties as county}
        <option value={county.countyName}>{county.countyName} County</option>
    {/each}
</select>

<script lang="ts">
import { COUNTY_LIST } from './constants';
import { parsedData, selectedCounty } from './stores';

$: selectedCountyName = $selectedCounty;

/**
 * Updates history, document title, and store upon user selection of a new county.
 * @param {object} event - event object
 */
const updateSelectedCounty = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    history.pushState({'selectedCountyName': target.value}, '', `/${target.value.replace(/ /g, '-').toLowerCase()}`);
    document.title = `${target.value} County - New Daily Coronavirus Cases`;
    selectedCounty.set(target.value);
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