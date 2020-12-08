import { covidData, selectedCountyData } from '../stores';
import { NEW_CONFIRMED_CASES } from "../constants";

export class DataService {

    /**
     * Parses CSV data into an array.
     * @param {string} covidData - CSV data
     * @returns {array} Array with an array of parsed data.
     */
    static getData = async () => {
        const response = await fetch(`https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/latimes-county-totals.csv`);
        const covidData = await response.text();
        return await DataService.parseCSVData(covidData);
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
        covidData.set(arrData);
        return arrData;
    }

    /**
     * Filters array data based on user selected county.
     * @param {array} data - Array of parsed data.
     */
    static filterSelectedCountyData = (selectedCounty: string, data: Array<string>) => {
        let filteredCountyData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes(selectedCounty)) {
                filteredCountyData.push(data[i]);
            }
        }
        selectedCountyData.set(filteredCountyData.reverse());
    }

    static getHighestDayCount = (data: Array<string>) => {
        let highestDayCount = 0;
        data.forEach((dailyData) => {
            let currentCount = parseInt(dailyData[NEW_CONFIRMED_CASES], 10);
            if (currentCount > highestDayCount) {
                highestDayCount = currentCount;
            }
        });
        return highestDayCount;
    }

};