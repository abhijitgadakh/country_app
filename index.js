document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries";
  const countryCardsContainer = document.getElementById("country-cards");
  const sortButton = document.getElementById("sort-population");

  async function fetchCountryData(sortByPopulation = false) {
    let url = apiUrl;
    if (sortByPopulation) {
      url += "?sort=population&order=desc";
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.data;
  }

  function createCountryCard(country) {
    const card = document.createElement("div");
    card.className = "card";

    // const flagImg = document.createElement("img");
    // flagImg.src = country.flag;
    // card.appendChild(flagImg);

    const countryName = document.createElement("h2");
    countryName.textContent = country.country;
    card.appendChild(countryName);

    const countryPopulation = document.createElement("p");
    countryPopulation.textContent = `Population: ${country.population}`;
    card.appendChild(countryPopulation);

    return card;
  }

  function displayCountries(countries) {
    countryCardsContainer.innerHTML = "";
    countries.forEach((country) => {
      const countryCard = createCountryCard(country);
      countryCardsContainer.appendChild(countryCard);
    });
  }

  async function loadCountries(sortByPopulation = false) {
    const countries = await fetchCountryData(sortByPopulation);
    displayCountries(countries);
  }

  sortButton.addEventListener("click", () => {
    loadCountries(true);
  });

  loadCountries();
});
