const prod = {
    API_BASE: 'https://musicgenie-production.up.railway.app'
}

const dev = {
    API_BASE: 'http://localhost:8000'
}

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;