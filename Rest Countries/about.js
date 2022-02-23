const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);

let country = queryString.slice(1);

let con = document.querySelector(".CountryShow");
let spinner = document.querySelector(".loader");
const api = `https://restcountries.com/v3.1/name/${country}`;

spinner.classList.add("hidden");

async function request(url) {
  spinner.classList.remove("hidden");
  try {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("Oh shit");
    }
    const data = await request.json();
    showCountries(data);
    spinner.classList.add("hidden");
  } catch (error) {
    console.log(error.message);
  }
}

request(api);

showCountries = (data) => {
  // console.log(data);
  //   const { name, flags, population, region, capital, altSpellings } = data[0];
  // console.log(data[0]);

  let card = document.createElement("div");
  card.classList.add("cardAbout");
  // console.log(data[0].currencies.MKD.name.chartAt().toUpperCase());
  card.innerHTML = `
    <div class="cardAbout">
    <div>
    <img src="${data[0].flags.png}" class="flag" alt="..." />
    </div>
    <div class="card-body">
    <div class="leftSide">
      <h3 class="nameOfCountry">${data[0].name.common}</h3>
      <br />
      <h3 class="s">Population: ${data[0].population}</h3>
      <h3 class="s">Region: ${data[0].region}</h3>
      <h3 class="s">Sub Region: ${data[0].subregion}</h3>
      <h3 class="s">Capital: ${data[0].capital}</h3>
    </div>
    <div class="rightSide">
        <h3 class="s">Region: ${data[0].tld}</h3>
        <br />
        <h3 class="s">Region: ${data[0].currencies.MKD.name}</h3>
    </div>
    </div>`;
  con.appendChild(card);
};
