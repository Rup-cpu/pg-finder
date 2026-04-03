const listings = [
  {
    name: "Sunrise Residency",
    location: "Bengaluru",
    price: 9500,
    image: "https://placehold.co/800x500/1e293b/f8fafc?text=Bengaluru+PG",
    contact: "+91 98765 21010"
  },
  {
    name: "City Nest PG",
    location: "Pune",
    price: 7200,
    image: "https://placehold.co/800x500/0f172a/e2e8f0?text=Pune+PG",
    contact: "+91 98765 32020"
  },
  {
    name: "Harbor Stay Homes",
    location: "Mumbai",
    price: 12800,
    image: "https://placehold.co/800x500/172554/f8fafc?text=Mumbai+PG",
    contact: "+91 98765 43030"
  },
  {
    name: "Palm Grove Living",
    location: "Hyderabad",
    price: 8100,
    image: "https://placehold.co/800x500/1d4ed8/f8fafc?text=Hyderabad+PG",
    contact: "+91 98765 54040"
  },
  {
    name: "Metro Comfort PG",
    location: "Delhi",
    price: 11500,
    image: "https://placehold.co/800x500/334155/f8fafc?text=Delhi+PG",
    contact: "+91 98765 65050"
  }
];

const pgGrid = document.getElementById("pgGrid");
const locationSearch = document.getElementById("locationSearch");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const clearFilters = document.getElementById("clearFilters");

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function createCard(listing) {
  const card = document.createElement("article");
  card.className = "pg-card";
  card.innerHTML = `
    <div class="pg-image-wrap">
      <img class="pg-image" src="${listing.image}" alt="${listing.name} in ${listing.location}" />
      <span class="price-chip">${currencyFormatter.format(listing.price)}/mo</span>
    </div>
    <div class="pg-body">
      <div class="pg-header">
        <div>
          <h3 class="pg-title">${listing.name}</h3>
          <p class="pg-location">${listing.location}</p>
        </div>
      </div>
      <div class="pg-footer">
        <div class="pg-price">
          <span class="price-label">Monthly rent</span>
          <span class="price-value">${currencyFormatter.format(listing.price)}</span>
        </div>
        <a class="contact-button" href="tel:${listing.contact.replace(/\s+/g, "")}">
          Contact
        </a>
      </div>
    </div>
  `;
  return card;
}

function getFilteredListings() {
  const searchValue = locationSearch.value.trim().toLowerCase();
  const minPrice = Number(minPriceInput.value) || 0;
  const maxPrice = Number(maxPriceInput.value) || Number.POSITIVE_INFINITY;

  return listings.filter((listing) => {
    const matchesLocation = listing.location.toLowerCase().includes(searchValue);
    const matchesPrice = listing.price >= minPrice && listing.price <= maxPrice;
    return matchesLocation && matchesPrice;
  });
}

function renderListings() {
  const filteredListings = getFilteredListings();
  pgGrid.innerHTML = "";

  if (filteredListings.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    const fragment = document.createDocumentFragment();
    filteredListings.forEach((listing) => {
      fragment.appendChild(createCard(listing));
    });
    pgGrid.appendChild(fragment);
  }

  const label = filteredListings.length === 1 ? "stay" : "stays";
  resultsCount.textContent = `${filteredListings.length} ${label} available`;
}

function resetFilters() {
  locationSearch.value = "";
  minPriceInput.value = "";
  maxPriceInput.value = "";
  renderListings();
  locationSearch.focus();
}

[locationSearch, minPriceInput, maxPriceInput].forEach((input) => {
  input.addEventListener("input", renderListings);
});

clearFilters.addEventListener("click", resetFilters);

renderListings();
