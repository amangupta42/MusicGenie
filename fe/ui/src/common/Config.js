const prod = {
    API_BASE: 'https://musicgenie-production.up.railway.app',
    BASE_URL: 'https://amangupta42.github.io/MusicGenie'
}

const dev = {
    API_BASE: 'http://localhost:8000',
    BASE_URL: 'http://localhost:3000'
}

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;