// script.js — World Food Explorer (Demo v1)

// Country data
const countries = [
  { name: "India", flag: "🇮🇳", dishes: ["Biryani", "Masala Dosa", "Butter Chicken"] },
  { name: "Bangladesh", flag: "🇧🇩", dishes: ["Hilsa Fish Curry", "Khichuri", "Pitha"] },
  { name: "Pakistan", flag: "🇵🇰", dishes: ["Nihari", "Biryani", "Chapli Kebab"] },
  { name: "Afghanistan", flag: "🇦🇫", dishes: ["Kabuli Pulao", "Mantu", "Bolani"] },
  { name: "USA", flag: "🇺🇸", dishes: ["Burger", "Hot Dog", "Apple Pie"] },
  { name: "UK", flag: "🇬🇧", dishes: ["Fish and Chips", "Shepherd’s Pie", "Sunday Roast"] },
  { name: "China", flag: "🇨🇳", dishes: ["Dumplings", "Sweet and Sour Pork", "Peking Duck"] }
];

// Populate country list dynamically
const container = document.querySelector(".container");
if (container) {
  const listHTML = countries.map(country => `
    <div class="country-card">
      <span>${country.flag} ${country.name}</span>
      <button onclick="showDishes('${country.name}')">Explore</button>
    </div>
  `).join("");
  container.innerHTML = `<h2>Select a Country</h2>${listHTML}`;
}

// Show dishes popup (demo)
function showDishes(countryName) {
  const country = countries.find(c => c.name === countryName);
  if (country) {
    alert(`${country.flag} ${country.name}\n\nPopular Dishes:\n- ${country.dishes.join("\n- ")}`);
  } else {
    alert("Country not found.");
  }
}

// Footer year auto-update
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  if (footer) {
    const year = new Date().getFullYear();
    footer.textContent = `© ${year} World Food Explorer`;
  }
});

// Ad banner click event (optional)
document.querySelectorAll(".ad-banner").forEach(ad => {
  ad.addEventListener("click", () => {
    alert("Ad clicked! (Sample placeholder)");
  });
});
