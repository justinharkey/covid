export interface ICounty {
    countyName: string;
    countySlug: string;
}

export interface ICounties {
    counties: Array<ICounty>;
}

export interface ICountyDailyDetail {
    date: string;
    confirmedCases: number;
    newConfirmedCases: number;
    reportedCases: number;
    probableCases: number;
    reportedAndProbableCases: number;
    reportedDeaths: number;
}

export interface ICountyDaily {
    county: string;
    fips: number;
    population: number;
    dailyDetails: ICountyDailyDetail[];
}