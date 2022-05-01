const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const nxtQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  // Pick a random quote from appropriate array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   Check if author field is blank and replace it with unknown.
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   Check quote length

  if (quote.text.length > 50) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }

  //   set quote and hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
nxtQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
