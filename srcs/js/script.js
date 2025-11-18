import { currencySupported } from "./country-list.js"

const ApiKey = "c17b1b0769e17069a3bad2e0"

const   enterAmount = document.querySelector("div#enter-amount input#amount")
const   fromCurrency = document.getElementById("from");
const   toCurrency = document.getElementById("to");

const   HtmlFinalResult = document.querySelector("div section p");

const   exchangeButton = document.querySelector("button#exchange");

exchangeButton.addEventListener("click", e => { e.preventDefault(); getExchangeResult(); })


async function getExchangeResult()
{
    HtmlFinalResult.innerHTML = `<div class="spinner"></div> Loading...`; // Pop a spinning circle
    HtmlFinalResult.classList.remove("error"); // Clear previous error styling
    
    let from = fromCurrency.value.toUpperCase(), to = toCurrency.value.toUpperCase(); // Update inputs after each click
    let amount = enterAmount.value;

    // if (!currencySupported.includes(from) || !currencySupported.includes(to)) // this can be ignored because is checked in line 41:if()
    // {
    //     HtmlFinalResult.innerText = "❌ Invalid currency";
    //     HtmlFinalResult.classList.add("error");
    //     return ;
    // }
    
    const   URL = `https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${from}`
    
    try
    {
        const   response = await fetch(URL);    // Send the GET request
        if (!response.ok) // Handle HTTP errors
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const   responseJSON = await response.json(); // Convert response to JSON
        if (!responseJSON.conversion_rates || !responseJSON.conversion_rates[to]) // Handle API-specific errors
        {
            throw new Error("Conversion rate not available");
        }
        
        let exchangeRate = responseJSON.conversion_rates[to];
        let totalExchangeRate = (amount * exchangeRate).toFixed(2);
        
        HtmlFinalResult.innerText = `${amount} ${from} = ${totalExchangeRate} ${to}`;
    }
    catch (error)
    {
        HtmlFinalResult.innerText = `❌ ${error.message}`;
        HtmlFinalResult.classList.add("error");
        console.error(error);
    }

/*
    without async keyword:

    const url = `https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${from}`
    // fetch(url).then(response => console.log(response.json()));
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[to];
        let totalExchangeRate = (amount * exchangeRate).toFixed(2);

        let HtmlFinalResult = document.querySelector("div section p");
        HtmlFinalResult.innerText = `${amount} ${from} = ${totalExchangeRate} ${to}`;
    })
*/
}

let switchButton = document.getElementById("switch")
switchButton.addEventListener("click", e => { e.preventDefault(); switchCurrency(); });

function switchCurrency()
{
    const tmp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tmp;

    getExchangeResult();
    // [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]; // this also works
}