const quotes = [
  "Be the change that you wish to see in the world.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "An eye for an eye will only make the whole world blind.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Strength does not come from physical capacity. It comes from an indomitable will."
];

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = `"${quotes[randomIndex]}"`;
}
