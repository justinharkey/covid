import { writable } from 'svelte/store';
import type { ICountyDaily } from './models/county';

export const covidData = writable(<ICountyDaily[]>[]);

export const selectedCounty = writable('Los Angeles');

export const selectedCountyData = writable(<ICountyDaily>{});
