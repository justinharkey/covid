import { writable } from 'svelte/store';

export const covidData = writable([]);

export const selectedCounty = writable('Los Angeles');

export const selectedCountyData = writable([]);
