<<<<<<< HEAD
<script lang="ts">
    import { COUNTY_LIST } from "./constants";
    import { selectedCounty } from "./stores";

    $: selectedCountyName = $selectedCounty;

    /**
     * Updates history, document title, and store upon user selection of a new county.
     * @param {object} event - event object
     */
    const updateSelectedCounty = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        history.pushState(
            { selectedCountyName: target.value },
            "",
            `/${target.value.replace(/ /g, "-").toLowerCase()}`
        );
        document.title = `${target.value} County - New Daily Coronavirus Cases`;
        selectedCounty.set(target.value);
    };
=======
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
>>>>>>> a9e445bf0a7aff6a0402bfbeb86940296449b101
</script>

<style>
    select {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        padding: 3px 0;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin: 4px 0;
    }
</style>

<div class="count count--county">
    <h1 class="count__title">Covid-19 Data For</h1>
    <!-- svelte-ignore a11y-no-onchange -->
    <select bind:value={selectedCountyName} on:change={updateSelectedCounty}>
        {#each COUNTY_LIST.counties as county}
            <option value={county.countyName}>
                {county.countyName}
                County
            </option>
        {/each}
    </select>
    <a
        class="count__subtitle"
        href="https://github.com/datadesk/california-coronavirus-data/blob/master/latimes-county-totals.csv">Source:
        LA Times</a>
</div>
