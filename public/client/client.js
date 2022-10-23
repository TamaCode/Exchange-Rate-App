const API_KEY = 'c0cdfce38c4be9f6dc3483f3';
const form = document.querySelector('form');
const resultField = document.querySelector('.process_result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const local_currency = form.local_currency.value.toUpperCase();
    const foreign_currency = form.foreign_currency.value.toUpperCase();
    resultField.textContent = 'Processing Request...';

    getExchangeRate(local_currency, foreign_currency)
        .then(exchangeRateValue => resultField.textContent = `Exchange Rate: ${exchangeRateValue}`)
        .catch(err => resultField.textContent = `${err}`);
});

const getExchangeRate = async (local_currency, foreign_currency) => {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${foreign_currency}`);
    const responseJSON = await response.json();
    console.log('responseJSON', responseJSON);

    if (responseJSON.result === 'success') {
        const exchangeRate = responseJSON.conversion_rates[local_currency];

        if (!exchangeRate) {
            throw 'Local Currency Symbol is not valid';
        }

        return exchangeRate;

    } else if (responseJSON.result === 'error') {
        const errorText = responseJSON['error-type'];

        if (errorText === 'unsupported-code') {
            throw 'Foreign Currency Symbol is not valid';
        }

        throw errorText;
    }
};