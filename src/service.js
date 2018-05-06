const api_key = 'dc6zaTOxFJmzC&_=1525594294539';

export default async function getImages({ offset=0, limit=10, q='' }) {
    const url = `http://api.giphy.com/v1/gifs/search?offset=${offset}&limit=${limit}&q=${q}&api_key=${api_key}`;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch(e) {
        console.log('Error', e.message);
    }
}