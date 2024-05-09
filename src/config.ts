// import dotenv from 'dotenv';

// dotenv.config();


interface Environment {
    baseUrl: string,
    apiRoutes: {
        bondDetails: (isin: string) => string;
        bondPriceHistory: (isin: string, priceType: string) => string;
        bondIssuers: () => string;
        bondSearch: () => string;
    }
}

// const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'
const env = process.env.NODE_ENV || 'local'

const environments: { [key: string]: Environment} = {
    local: {
        baseUrl: 'http://localhost:8000',
        apiRoutes: {
            bondDetails: (isin) => `/v1/bond/characteristics?isin=${isin}`,
            bondPriceHistory: (isin, priceType) => `/v1/bond/historical?isin=${isin}&price_type=${priceType}`,
            bondIssuers: () => '/v1/bond/search_criteria_data',
            bondSearch: () => '/v1/bond/search'
        }
    },
    development: {
        baseUrl: 'https://bond-api-bf.vercel.app',
        apiRoutes: {
            bondDetails: (isin) => `/v1/bond/characteristics?isin=${isin}`,
            bondPriceHistory: (isin, priceType) => `/v1/bond/historical?isin=${isin}&price_type=${priceType}`,
            bondIssuers: () => `/v1/bond/search_criteria_data`,
            bondSearch: () => 'v1/bond/search'
        }
    },
    production: {
        baseUrl: 'https://bond-api-bf.vercel.app',
        apiRoutes: {
            bondDetails: (isin) => `/v1/bond/characteristics?isin=${isin}`,
            bondPriceHistory: (isin, priceType) => `/v1/bond/historical?isin=${isin}&price_type=${priceType}`,
            bondIssuers: () => '/v1/bond/search_criteria_data',
            bondSearch: () => 'v1/bond/search'
        }
    }
}

const config = {
    // baseUrl,
    ...environments[env]
}
console.log(env)

export default config;
