let grid = document.querySelector(".countriesSide");
let spinner = document.querySelector(".loader");
let input = document.querySelector(".form-control");
let select = document.querySelector(".form-select");
const api = "https://restcountries.com/v3.1/all";

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
  } catch (err) {
    console.log(err.message);
  }
}

request(api);

showCountries = (data) => {
  // console.log(data);
  data.map((ACountry) => {
    const { name, flags, population, region, capital, altSpellings } = ACountry;

    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `${name.common}`);
    card.setAttribute("data", `${region}`);
    card.innerHTML = `
    <div class="card" style="width: 18rem">
    <img src="${flags.png}" class="flag" alt="..." />
    <div class="card-body">
      <h3 class="s">${name.common}</h3>
      <br />
      <h3 class="s">Population: ${population}</h3>
      <h3 class="s">Region: ${region}</h3>
      <h3 class="s">Capital: ${capital}</h3>
      <a class="btn" href="./about.html?${name.common}">Wanna see more?</a>
    </div>`;
    grid.appendChild(card);
  });
};

input.addEventListener("input", function (e) {
  let valueOfInput = e.target.value.toLowerCase();
  let allCards = grid.childNodes;
  for (let i = 3; i < allCards.length; i++) {
    let nameOfCountry = allCards[i].getAttribute("id").toLowerCase();
    if (!nameOfCountry.includes(valueOfInput)) {
      allCards[i].classList.add("hidden");
    } else {
      allCards[i].classList.remove("hidden");
    }
  }
});

select.addEventListener("change", function () {
  let valueofSelect = select.value;
  // console.log(valueofSelect);
  let allCards = grid.childNodes;
  for (let i = 3; i < allCards.length; i++) {
    let regionofACountry = allCards[i].getAttribute("data").toLowerCase();
    if (!regionofACountry.includes(valueofSelect)) {
      allCards[i].classList.add("hidden");
    } else if (valueofSelect == 0) {
      allCards[i].classList.remove("hidden");
    } else {
      allCards[i].classList.remove("hidden");
    }
  }
});

// InserBefore
