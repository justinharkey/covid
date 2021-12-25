import { covidData, selectedCountyData } from '../stores';
import { COUNTY, CONFIRMED_CASES, DATE, PROBABLE_CASES, REPORTED_AND_PROBABLE_CASES, REPORTED_CASES, REPORTED_DEATHS, FIPS, POPULATION } from "../constants";
import type { ICountyDaily } from '../models/county';

export class DataService {

    /**
     * Parses CSV data into an array.
     * @param {string} covidData - CSV data
     * @returns {array} Array with an array of parsed data.
     */
    static getData = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/cdph-county-cases-deaths.csv`);
        const covidData = await response.text();
        return await DataService.parseCSVData(covidData);
    }

     /**
     * Formats CSV data into an array of objects, categorized by count name.
     * @returns {ICountyDaily[]} An array of county details
     */
    static formatData = (data: Array<any>): ICountyDaily[] => {
        let formattedData: ICountyDaily[] = [];
        for (let i = 1; i < data.length; i++) {
            const currentDay = data[i];
            const indexOfCounty = formattedData.findIndex(counties => counties.county === currentDay[COUNTY]);
            const dailyDetails = {
                date: currentDay[DATE],
                confirmedCases: parseInt(currentDay[CONFIRMED_CASES], 10),
                newConfirmedCases: 0,
                reportedCases: parseInt(currentDay[REPORTED_CASES], 10),
                probableCases: parseInt(currentDay[PROBABLE_CASES], 10),
                reportedAndProbableCases: parseInt(currentDay[REPORTED_AND_PROBABLE_CASES], 10),
                reportedDeaths: parseInt(currentDay[REPORTED_DEATHS], 10)
            };

            if (indexOfCounty !== -1) {
                formattedData[indexOfCounty].dailyDetails.unshift(dailyDetails)
            } else {
                formattedData.push({
                    county: currentDay[COUNTY],
                    fips: parseInt(currentDay[FIPS], 10),
                    population: parseInt(currentDay[POPULATION], 10),
                    dailyDetails: [dailyDetails]
                })
            }
        }
        return formattedData;
    }

    /**
     * Fetches CSV data.
     * @returns {Promise} Promise containing CSV data.
     */
    static parseCSVData = (unparsedData: string) => {
        // regex from https://gist.github.com/Jezternz/c8e9fafc2c114e079829974e3764db75
        const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"), "gi");
        let arrMatches = null, arrData = [[]];
        while (arrMatches = objPattern.exec(unparsedData)) {
            if (arrMatches[1].length && arrMatches[1] !== ",") arrData.push([]);
            arrData[arrData.length - 1].push(arrMatches[2] ?
                arrMatches[2].replace(new RegExp("\"\"", "g"), "\"") :
                arrMatches[3]);
        }
        covidData.set(DataService.formatData(arrData));
        return arrData;
    }

    /**
     * Filters array data based on user selected county.
     * @param {array} data - Array of parsed data.
     */
    static filterSelectedCountyData = (selectedCounty: string, data: Array<ICountyDaily>) => {
        const filteredCounty = data.filter(x => x.county === selectedCounty)[0] || {} as ICountyDaily;
        selectedCountyData.set(filteredCounty);
    }

    static getHighestDayCount = (data: ICountyDaily) => {
        let highestDayCount = 0;
        if (data.dailyDetails && data.dailyDetails.length > 0) {
            for (let i = 0; i < data.dailyDetails.length; i++) {
                const currentDayCount = i > 0 ? data.dailyDetails[i].reportedCases - data.dailyDetails[i - 1].reportedCases : 0;
                if (currentDayCount > highestDayCount) {
                    highestDayCount = currentDayCount;
                }
            }
        }
        return highestDayCount;
    }

};