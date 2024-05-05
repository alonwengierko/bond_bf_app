

interface Environment {
    apiRoutes: {
        bondDetails: string;
        bondPriceHistory: string;
    }
}

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'
const env = process.env.NODE_ENV || 'local'

const environments: { [key: string]: Environment} = {
    local: {
        apiRoutes: {
            bondDetails: 'api/v1/bond/characteristics',
            bondPriceHistory: 'api/v1/bond/historical'
        }
    },
    dev: {
        apiRoutes: {
            bondDetails: 'api/v1/bond/characteristics',
            bondPriceHistory: 'api/v1/bond/historical'
        }
    }
}

const config = {
    baseUrl,
    ...environments[env]
}

export default config;
