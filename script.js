// Map - https://www.worldometers.info/geography/flags-of-the-world/
const base = document.querySelector(".base")
const cur1 = document.querySelector(".cur-1")
const cur2 = document.querySelector(".cur-2")
const cur1Input = document.querySelector(".cur-1-input")
const cur2Input = document.querySelector(".cur-2-input")
const Switch = document.querySelector(".switch-cur")
const countries = [
  {
    name: "AED",
    flagURL: "https://www.worldometers.info/img/flags/ae-flag.gif",
  },
  {
    name: "EUR",
    flagURL: "https://www.worldometers.info/img/flags/au-flag.gif",
  },
  {
    name: "GBP",
    flagURL: "https://www.worldometers.info/img/flags/uk-flag.gif",
  },
  {
    name: "USD",
    flagURL: "https://www.worldometers.info/img/flags/us-flag.gif",
  },
];

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
const apiURL = "https://v6.exchangerate-api.com/v6/";
const key = "093352694b431c8342cff984";

// Get Exchange Rate

async function getExhcangeRate () {
  const cur1Value = cur1.value
  const cur2Value = cur2.value
  let res = await fetch(`${apiURL}${key}/latest/${cur1Value}`)
  let data = await res.json()
  const rate = await data.conversion_rates[cur2Value]
  base.innerHTML = `  ${cur1Input.value} ${cur1Value} = ${rate.toFixed(2)} ${cur2Value} `
  cur2Input.value = (cur1Input.value * rate).toFixed(2)
}

cur1.addEventListener("change",()=>{
  getExhcangeRate()
  flagChang()
})
cur2.addEventListener("change",()=>{
  getExhcangeRate()
  flagChang()
})
cur1Input.addEventListener("input",getExhcangeRate)
cur2Input.addEventListener("input",getExhcangeRate)

function flagChang () {
  countries.forEach(country => {
    if(cur1.value==country.name){
      const imgScr = document.querySelector(".from img")
      imgScr.setAttribute("src",country.flagURL)
    }else if (cur2.value==country.name){
      const img1Scr = document.querySelector(".to img")
      img1Scr.setAttribute("src",country.flagURL)
    }
  });
}