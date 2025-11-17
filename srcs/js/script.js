import { currencySupported } from "./country-list.js";

const ApiKey = "c17b1b0769e17069a3bad2e0";

let fromCurrency = document.getElementById("from");
let toCurrency = document.getElementById("to");

let exchangeButton = document.getElementById("exchange");
exchangeButton.addEventListener("click", e => { e.preventDefault(); getExchangeRate(); });

function getExchangeRate()
{
    
    const amount = document.getElementById("amount");
    let amountValue = amount.value
    
    const fromCurrencyValue = fromCurrency.value.toUpperCase(), toCurrencyValue = toCurrency.value.toUpperCase();
    if (!currencySupported.includes(fromCurrencyValue) || !currencySupported.includes(toCurrencyValue))
        alert("invalide currency")

    const url = `https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${fromCurrencyValue}`
    // fetch(url).then(response => console.log(response.json()));
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrencyValue];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);

        let HtmlFinalResult = document.querySelector("div section p");
        HtmlFinalResult.innerText = `${amountValue} ${fromCurrencyValue} = ${totalExchangeRate} ${toCurrencyValue}`;
    })
}

/**
 ***********************************************************************
 ***********************************************************************
 */

let switchButton = document.getElementById("switch")
switchButton.addEventListener("click", e => { e.preventDefault(); switchCurrency(); });

function switchCurrency() {
    const tmp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tmp;

    getExchangeRate();
    // [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]; // this also works
}

/**
 ***********************************************************************
 ***********************************************************************
 */
