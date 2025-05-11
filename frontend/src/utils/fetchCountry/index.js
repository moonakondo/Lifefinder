import axios from 'axios';

const getCountryInfo = async (countryCode) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching country info:', error);
        return null;
    }
};
export default getCountryInfo