// API key for news API
const API_KEY = "4a4f2552ae8f47b8bc80cee68cb27e1d";

// Base URL for news API
const url = "https://newsapi.org/v2/everything?q=";

// Fetch news on page load
window.addEventListener("load", () => fetchNews("India"));

// Reload the page
function reload() {
  window.location.reload();
}

// Show loader before fetching data and hide news cards
function showLoader() {
  const loader = document.getElementById("loader");
  const cardsContainer = document.getElementById("cards-container");
  loader.style.display = "block";
  cardsContainer.classList.add("hide-content");
}

// Hide loader after data is loaded and show news cards
function hideLoader() {
  const loader = document.getElementById("loader");
  const cardsContainer = document.getElementById("cards-container");
  loader.style.display = "none";
  cardsContainer.classList.remove("hide-content");
}

// Fetch news based on query
async function fetchNews(query) {
  showLoader();
  try {
    // Construct the API request URL
    const requestUrl = `${url}${query}&apiKey=${API_KEY}`;

    // Fetch news data from API
    const res = await fetch(requestUrl);

    // Parse JSON response
    const data = await res.json();

    // Bind news data to HTML
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news data:", error);
  } finally {
    hideLoader();
  }
}

// Bind news data to HTML
function bindData(articles) {
  // Get the container for news cards
  const cardsContainer = document.getElementById("cards-container");

  // Get the template for news cards
  const newsCardTemplate = document.getElementById("template-news-card");

  // Clear existing news cards
  cardsContainer.innerHTML = "";

  // Iterate over news articles
  articles.forEach((article) => {
    // Skip articles without images
    if (!article.urlToImage) return;

    // Clone the news card template
    const cardClone = newsCardTemplate.content.cloneNode(true);

    // Fill the news card with article data
    fillDataInCard(cardClone, article);

    // Append the news card to the container
    cardsContainer.appendChild(cardClone);
  });
}

// Fill a news card with article data
function fillDataInCard(cardClone, article) {
  // Get elements in the news card
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  // Set news card data
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  // Format and set news source and date
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} · ${date}`;

  // Add event listener to news card
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Track the currently selected navigation item
let curSelectedNav = null;

// Handle navigation item click
function onNavItemClick(id) {
  // Fetch news based on navigation item
  fetchNews(id);

  // Update the currently selected navigation item
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

// Handle search button click
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", () => {
  const query = searchText.value;

  // Skip empty search queries
  if (!query) return;

  // Fetch news based on search query
  fetchNews(query);

  // Reset the currently selected navigation item
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
