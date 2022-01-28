import type { ICounties } from './models/county';

// County Totals
export const DATE: number = 0;
export const COUNTY: number = 1;
export const FIPS: number = 2;
export const POPULATION = 3;
export const CONFIRMED_CASES = 4;
export const REPORTED_CASES = 5;
export const PROBABLE_CASES = 6;
export const REPORTED_AND_PROBABLE_CASES = 7;
export const REPORTED_DEATHS = 8;

// Dates
export const START_DATE: string = '2020-03-02';

// Counties
export const COUNTY_LIST: ICounties = {
    counties: [
        {
            countyName: 'Alameda',
            countySlug: 'alameda',
            fips: 6001,
        },
        {
            countyName: 'Alpine',
            countySlug: 'alpine',
            fips: 6003,
        },
        {
            countyName: 'Amador',
            countySlug: 'amador',
            fips: 6005,
        },
        {
            countyName: 'Butte',
            countySlug: 'butte',
            fips: 6007,
        },
        {
            countyName: 'Calaveras',
            countySlug: 'calaveras',
            fips: 6009,
        },
        {
            countyName: 'Colusa',
            countySlug: 'colusa',
            fips: 6011,
        },
        {
            countyName: 'Contra Costa',
            countySlug: 'contra-costa',
            fips: 6013,
        },
        {
            countyName: 'Del Norte',
            countySlug: 'del-norte',
            fips: 6015,
        },
        {
            countyName: 'El Dorado',
            countySlug: 'el-dorado',
            fips: 6017,
        },
        {
            countyName: 'Fresno',
            countySlug: 'fresno',
            fips: 6019,
        },
        {
            countyName: 'Glenn',
            countySlug: 'glenn',
            fips: 6021,
        },
        {
            countyName: 'Humboldt',
            countySlug: 'humboldt',
            fips: 6023,
        },
        {
            countyName: 'Imperial',
            countySlug: 'imperial',
            fips: 6025,
        },
        {
            countyName: 'Inyo',
            countySlug: 'inyo',
            fips: 6027,
        },
        {
            countyName: 'Kern',
            countySlug: 'kern',
            fips: 6029,
        },
        {
            countyName: 'Kings',
            countySlug: 'kings',
            fips: 6031,
        },
        {
            countyName: 'Lake',
            countySlug: 'lake',
            fips: 6033,
        },
        {
            countyName: 'Lassen',
            countySlug: 'lassen',
            fips: 6035,
        },
        {
            countyName: 'Los Angeles',
            countySlug: 'los-angeles',
            fips: 6037,
        },
        {
            countyName: 'Madera',
            countySlug: 'madera',
            fips: 6039,
        },
        {
            countyName: 'Marin',
            countySlug: 'marin',
            fips: 6041,
        },
        {
            countyName: 'Mariposa',
            countySlug: 'mariposa',
            fips: 6043,
        },
        {
            countyName: 'Mendocino',
            countySlug: 'mendocino',
            fips: 6045,
        },
        {
            countyName: 'Merced',
            countySlug: 'merced',
            fips: 6047,
        },
        {
            countyName: 'Modoc',
            countySlug: 'modoc',
            fips: 6049,
        },
        {
            countyName: 'Mono',
            countySlug: 'mono',
            fips: 6051,
        },
        {
            countyName: 'Monterey',
            countySlug: 'monterey',
            fips: 6053,
        },
        {
            countyName: 'Napa',
            countySlug: 'napa',
            fips: 6055,
        },
        {
            countyName: 'Nevada',
            countySlug: 'nevada',
            fips: 6057,
        },
        {
            countyName: 'Orange',
            countySlug: 'orange',
            fips: 6059,
        },
        {
            countyName: 'Placer',
            countySlug: 'placer',
            fips: 6061,
        },
        {
            countyName: 'Plumas',
            countySlug: 'plumas',
            fips: 6063,
        },
        {
            countyName: 'Riverside',
            countySlug: 'riverside',
            fips: 6065,
        },
        {
            countyName: 'Sacramento',
            countySlug: 'sacramento',
            fips: 6067,
        },
        {
            countyName: 'San Benito',
            countySlug: 'san-benito',
            fips: 6069,
        },
        {
            countyName: 'San Bernardino',
            countySlug: 'san-bernardino',
            fips: 6071,
        },
        {
            countyName: 'San Diego',
            countySlug: 'san-diego',
            fips: 6073,
        },
        {
            countyName: 'San Francisco',
            countySlug: 'san-francisco',
            fips: 6075,
        },
        {
            countyName: 'San Joaquin',
            countySlug: 'san-joaquin',
            fips: 6077,
        },
        {
            countyName: 'San Luis Obispo',
            countySlug: 'san-luis-obispo',
            fips: 6079,
        },
        {
            countyName: 'San Mateo',
            countySlug: 'san-mateo',
            fips: 6081,
        },
        {
            countyName: 'Santa Barbara',
            countySlug: 'santa-barbara',
            fips: 6083,
        },
        {
            countyName: 'Santa Clara',
            countySlug: 'santa-clara',
            fips: 6085,
        },
        {
            countyName: 'Santa Cruz',
            countySlug: 'santa-cruz',
            fips: 6087,
        },
        {
            countyName: 'Shasta',
            countySlug: 'shasta',
            fips: 6089,
        },
        {
            countyName: 'Sierra',
            countySlug: 'sierra',
            fips: 6091,
        },
        {
            countyName: 'Siskiyou',
            countySlug: 'siskiyou',
            fips: 6093,
        },
        {
            countyName: 'Solano',
            countySlug: 'solano',
            fips: 6095,
        },
        {
            countyName: 'Sonoma',
            countySlug: 'sonoma',
            fips: 6097,
        },
        {
            countyName: 'Stanislaus',
            countySlug: 'stanislaus',
            fips: 6099,
        },
        {
            countyName: 'Sutter',
            countySlug: 'sutter',
            fips: 6101,
        },
        {
            countyName: 'Tehama',
            countySlug: 'tehama',
            fips: 6103,
        },
        {
            countyName: 'Trinity',
            countySlug: 'trinity',
            fips: 6105,
        },
        {
            countyName: 'Tulare',
            countySlug: 'tulare',
            fips: 6107,
        },
        {
            countyName: 'Tuolumne',
            countySlug: 'tuolumne',
            fips: 6109,
        },
        {
            countyName: 'Ventura',
            countySlug: 'ventura',
            fips: 6111,
        },
        {
            countyName: 'Yolo',
            countySlug: 'yolo',
            fips: 6113,
        },
        {
            countyName: 'Yuba',
            countySlug: 'yuba',
            fips: 6115,
        }
    ]
};