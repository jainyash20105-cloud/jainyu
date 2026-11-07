// ====== CHANGE THESE ======
// Your WhatsApp number with country code, no + or spaces. Example for India: 919876543210
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const STORE_NAME = "YJ Daily Store";

// ====== YOUR PRODUCTS ======
// Add, remove or edit items here. Use only products you have checked for quality.
const products = [
  { name: "Wireless Earbuds",     category: "Gadgets",     price: 799, icon: "🎧", note: "Sample item - edit me" },
  { name: "Phone Fast Charger",   category: "Gadgets",     price: 399, icon: "🔌", note: "Sample item - edit me" },
  { name: "Power Bank 10000mAh",  category: "Gadgets",     price: 899, icon: "🔋", note: "Sample item - edit me" },
  { name: "Cotton T-Shirt",       category: "Clothing",    price: 349, icon: "👕", note: "Sample item - edit me" },
  { name: "Comfort Joggers",      category: "Clothing",    price: 599, icon: "👖", note: "Sample item - edit me" },
  { name: "Backpack",             category: "Accessories", price: 699, icon: "🎒", note: "Sample item - edit me" },
  { name: "Steel Water Bottle",   category: "Daily Needs", price: 299, icon: "🧴", note: "Sample item - edit me" },
  { name: "Notebook Pack (5)",    category: "Daily Needs", price: 199, icon: "📓", note: "Sample item - edit me" }
];

// ====== CODE BELOW MAKES THE SHOP WORK ======
const filtersEl = document.getElementById("filters");
const productsEl = document.getElementById("products");

const categories = ["All", ...new Set(products.map(p => p.category))];
let current = "All";

function orderLink(product) {
  const msg = `Hi ${STORE_NAME}, I want to order: ${product.name} (Rs ${product.price}). Please share the next steps.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function renderFilters() {
  filtersEl.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "filter" + (cat === current ? " active" : "");
    btn.onclick = () => { current = cat; renderFilters(); renderProducts(); };
    filtersEl.appendChild(btn);
  });
}

function renderProducts() {
  productsEl.innerHTML = "";
  products
    .filter(p => current === "All" || p.category === current)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "card product";
      card.innerHTML = `
        <div class="icon">${p.icon}</div>
        <h3>${p.name}</h3>
        <p class="cat">${p.category}</p>
        <p class="note">${p.note}</p>
        <p class="price">Rs ${p.price}</p>
        <a class="button" href="${orderLink(p)}" target="_blank" rel="noopener">Order on WhatsApp</a>
      `;
      productsEl.appendChild(card);
    });
}

document.getElementById("waLink").href = `https://wa.me/${WHATSAPP_NUMBER}`;
renderFilters();
renderProducts();
