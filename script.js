// Datos de ejemplo para las tiendas de electrodomésticos
// Estos datos simulan la información que tendrías de tu base de datos
const stores = [
  {
    id: 1,
    name: "Plaza Lama",
    address: "Av. 27 de Febrero, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.7,
    reviews: 250,
    hours: "9:00 AM - 7:00 PM",
    types: ["Nevera", "Televisor", "Lavadora", "Estufa", "Aire Acondicionado"],
    brands: ["Samsung", "LG", "Mabe", "Whirlpool"],
    price: 25000, // Precio promedio de un electrodoméstico representativo
    promotions: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Ferretaría Americana (Corripio)",
    address: "Av. John F. Kennedy, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.2,
    reviews: 180,
    hours: "8:30 AM - 6:30 PM",
    types: ["Nevera", "Estufa", "Aire Acondicionado"],
    brands: ["Mabe", "General Electric", "Whirlpool"],
    price: 18000,
    promotions: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Jumbo Megacentro",
    address: "Av. San Vicente de Paúl, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.5,
    reviews: 300,
    hours: "9:00 AM - 9:00 PM",
    types: ["Televisor", "Lavadora", "Estufa", "Nevera"],
    brands: ["Samsung", "LG", "Mabe"],
    price: 22000,
    promotions: true,
    inStock: true,
  },
  {
    id: 4,
    name: "La Curacao",
    address: "Av. Abraham Lincoln, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.0,
    reviews: 150,
    hours: "9:00 AM - 7:00 PM",
    types: ["Nevera", "Televisor", "Lavadora"],
    brands: ["Samsung", "LG", "Whirlpool"],
    price: 19000,
    promotions: false,
    inStock: false, // Simula que no siempre tienen todo en stock
  },
  {
    id: 5,
    name: "Hometek",
    address: "Calle El Sol, Santiago",
    province: "Santiago",
    rating: 4.8,
    reviews: 90,
    hours: "9:30 AM - 6:00 PM",
    types: ["Televisor", "Aire Acondicionado"],
    brands: ["Samsung", "LG"],
    price: 35000,
    promotions: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Electrodomésticos Caribe",
    address: "Av. España, Punta Cana",
    province: "Punta Cana",
    rating: 3.9,
    reviews: 60,
    hours: "10:00 AM - 6:00 PM",
    types: ["Nevera", "Estufa", "Lavadora"],
    brands: ["Mabe", "General Electric"],
    price: 16000,
    promotions: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Electrónica Global",
    address: "Calle Duarte, Santiago",
    province: "Santiago",
    rating: 4.3,
    reviews: 110,
    hours: "8:00 AM - 5:00 PM",
    types: ["Televisor", "Aire Acondicionado", "Nevera"],
    brands: ["Samsung", "LG", "Mabe"],
    price: 28000,
    promotions: true,
    inStock: true,
  },
  {
    id: 8,
    name: "Casa Cuesta",
    address: "Av. 27 de Febrero, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.4,
    reviews: 190,
    hours: "9:00 AM - 8:00 PM",
    types: ["Nevera", "Lavadora", "Estufa"],
    brands: ["LG", "Whirlpool"],
    price: 21000,
    promotions: false,
    inStock: true,
  },
  {
    id: 9,
    name: "Electro Outlet",
    address: "Autopista Duarte, Santo Domingo",
    province: "Santo Domingo",
    rating: 3.7,
    reviews: 75,
    hours: "9:00 AM - 6:00 PM",
    types: ["Nevera", "Lavadora", "Televisor"],
    brands: ["Mabe", "General Electric"],
    price: 12000,
    promotions: true,
    inStock: true,
  },
  {
    id: 10,
    name: "Tiendas La Sirena",
    address: "Av. Charles de Gaulle, Santo Domingo",
    province: "Santo Domingo",
    rating: 4.1,
    reviews: 210,
    hours: "8:00 AM - 10:00 PM",
    types: ["Televisor", "Estufa", "Lavadora"],
    brands: ["Samsung", "LG"],
    price: 17000,
    promotions: true,
    inStock: true,
  },
];

// Obtener elementos del DOM
const storeGrid = document.getElementById("store-grid");
const mainSearchInput = document.getElementById("main-search-input");
const mainSearchButton = document.getElementById("main-search-button");
const typeFilters = document.querySelectorAll(".type-filter");
const locationTextInput = document.getElementById("location-text-input");
const provinceSelect = document.getElementById("province-select");
const minPriceInput = document.getElementById("min-price-input");
const maxPriceInput = document.getElementById("max-price-input");
const pricePresetRadios = document.querySelectorAll(".price-preset-radio");
const brandFilters = document.querySelectorAll(".brand-filter");
const ratingFilters = document.querySelectorAll(".rating-filter");
const inStockFilter = document.getElementById("in-stock-filter");
const promotionFilter = document.getElementById("promotion-filter");
const applyFiltersButton = document.getElementById("apply-filters-button"); // Botón para aplicar filtros
const resultsTitle = document.getElementById("results-title");
const noResultsMessage = document.getElementById("no-results-message");
const sortSelect = document.getElementById("sort-select");

// Función para generar las estrellas de valoración visualmente
function getStarRatingHtml(rating) {
  let starsHtml = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>';
  }
  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    starsHtml += '<i class="far fa-star"></i>';
  }
  return starsHtml;
}

// Función para renderizar las tarjetas de tiendas en el DOM
function renderStores(filteredStores) {
  storeGrid.innerHTML = ""; // Limpiar resultados anteriores

  if (filteredStores.length === 0) {
    noResultsMessage.style.display = "block";
    resultsTitle.textContent = "No se encontraron tiendas";
    return;
  } else {
    noResultsMessage.style.display = "none";
    resultsTitle.textContent = `Tiendas de Electrodomésticos (${filteredStores.length} resultados)`;
  }

  filteredStores.forEach((store) => {
    const storeCard = document.createElement("div");
    storeCard.classList.add("store-card");

    // Mapea los tipos de electrodomésticos a etiquetas HTML
    const typesHtml = store.types
      .map((type) => `<span>${type}</span>`)
      .join("");

    storeCard.innerHTML = `
            <div class="store-name-display">${store.name}</div>
            <h3>${store.name}</h3>
            <p class="address"><i class="fas fa-map-marker-alt"></i> ${
              store.address
            }</p>
            <div class="rating">
                ${getStarRatingHtml(store.rating)} <span>${store.rating.toFixed(
      1
    )} (${store.reviews} reseñas)</span>
            </div>
            <p class="hours"><i class="fas fa-clock"></i> Abierto ahora: ${
              store.hours
            }</p>
            <div class="tags">
                ${typesHtml}
            </div>
            <div class="card-actions">
                <button class="btn-details">Ver Detalles</button>
                <button class="btn-directions"><i class="fas fa-directions"></i> Cómo Llegar</button>
                <i class="fas fa-heart fav-icon"></i>
                <i class="fas fa-share-alt share-icon"></i>
            </div>
        `;
    storeGrid.appendChild(storeCard);
  });
}

// Función principal para aplicar todos los filtros y renderizar los resultados
function applyFilters() {
  let filteredStores = [...stores]; // Crear una copia mutable del array original

  // 1. Filtro de búsqueda principal (barra superior)
  const searchTerm = mainSearchInput.value.toLowerCase().trim();
  if (searchTerm) {
    filteredStores = filteredStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm) ||
        store.types.some((type) => type.toLowerCase().includes(searchTerm)) ||
        store.brands.some((brand) => brand.toLowerCase().includes(searchTerm))
    );
  }

  // 2. Filtro por Tipo de Electrodoméstico (checkboxes)
  const selectedTypes = Array.from(typeFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value.toLowerCase());
  if (selectedTypes.length > 0) {
    // Aplicar solo si hay tipos seleccionados
    filteredStores = filteredStores.filter((store) =>
      selectedTypes.some((type) =>
        store.types.map((t) => t.toLowerCase()).includes(type)
      )
    );
  }

  // 3. Filtro por Ubicación (texto o select de provincia)
  const locationText = locationTextInput.value.toLowerCase().trim();
  const selectedProvince = provinceSelect.value.toLowerCase();

  if (locationText) {
    // Si hay texto de ubicación
    filteredStores = filteredStores.filter(
      (store) =>
        store.address.toLowerCase().includes(locationText) ||
        store.province.toLowerCase().includes(locationText)
    );
  } else if (selectedProvince) {
    // Si se seleccionó una provincia
    filteredStores = filteredStores.filter(
      (store) => store.province.toLowerCase() === selectedProvince
    );
  }

  // 4. Filtro por Rango de Precios
  let minPrice = parseFloat(minPriceInput.value);
  let maxPrice = parseFloat(maxPriceInput.value);

  // Si se usó un preset de precio (radio button), sobrescribir min/max
  const selectedPreset = Array.from(pricePresetRadios).find(
    (radio) => radio.checked
  );
  if (selectedPreset) {
    const presetValue = selectedPreset.value;
    if (presetValue === "0-15000") {
      minPrice = 0;
      maxPrice = 15000;
    } else if (presetValue === "15000-30000") {
      minPrice = 15000;
      maxPrice = 30000;
    } else if (presetValue === "30000-inf") {
      minPrice = 30000;
      maxPrice = Infinity; // Representa un valor máximo muy alto
    }
  }

  // Asegurarse de que los valores de min/max sean números válidos, si no, usar 0 e Infinity
  minPrice = isNaN(minPrice) ? 0 : minPrice;
  maxPrice = isNaN(maxPrice) ? Infinity : maxPrice;

  filteredStores = filteredStores.filter(
    (store) => store.price >= minPrice && store.price <= maxPrice
  );

  // 5. Filtro por Marca (checkboxes)
  const selectedBrands = Array.from(brandFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value.toLowerCase());
  if (selectedBrands.length > 0) {
    // Aplicar solo si hay marcas seleccionadas
    filteredStores = filteredStores.filter((store) =>
      selectedBrands.some((brand) =>
        store.brands.map((b) => b.toLowerCase()).includes(brand)
      )
    );
  }

  // 6. Filtro por Valoración (radio buttons)
  // Obtiene el valor del radio button seleccionado para la valoración mínima
  const minRatingElement = Array.from(ratingFilters).find(
    (radio) => radio.checked
  );
  const minRating = minRatingElement ? parseFloat(minRatingElement.value) : 0;

  if (minRating > 0) {
    // Aplicar solo si se ha seleccionado una valoración mínima (no 'Todas')
    filteredStores = filteredStores.filter(
      (store) => store.rating >= minRating
    );
  }

  // 7. Filtro por Disponibilidad (checkbox 'En Stock')
  if (inStockFilter.checked) {
    filteredStores = filteredStores.filter((store) => store.inStock);
  }

  // 8. Filtro por Promociones (checkbox 'Con descuentos')
  if (promotionFilter.checked) {
    filteredStores = filteredStores.filter((store) => store.promotions);
  }

  // Aplicar ordenamiento a los resultados finales
  const sortBy = sortSelect.value;
  if (sortBy === "rating") {
    filteredStores.sort((a, b) => b.rating - a.rating); // Mayor valoración primero
  } else if (sortBy === "atoz") {
    filteredStores.sort((a, b) => a.name.localeCompare(b.name)); // Orden alfabético por nombre
  }
  // Puedes añadir más lógicas de ordenamiento aquí (ej. por distancia si tuvieras coordenadas, o por precio)

  // Finalmente, renderiza las tiendas filtradas y ordenadas
  renderStores(filteredStores);
}

// --- Event Listeners para interacción del usuario ---

// Búsqueda principal: aplica filtros al hacer clic en el botón o presionar Enter
mainSearchButton.addEventListener("click", applyFilters);
mainSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    applyFilters();
  }
});

// Botón "Aplicar Filtros": dispara la lógica principal de filtrado
// Aunque muchos filtros se aplican automáticamente, es bueno tener un botón explícito para el usuario
applyFiltersButton.addEventListener("click", applyFilters);

// Filtros de Tipo de Electrodoméstico (checkboxes): aplica filtros al cambiar selección
typeFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

// Filtro de Ubicación: aplica filtros al cambiar select de provincia o al presionar Enter en el campo de texto
provinceSelect.addEventListener("change", applyFilters);
locationTextInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    applyFilters();
  }
});
// También puedes añadir un evento 'input' para el campo de texto de ubicación si quieres una respuesta más inmediata
// locationTextInput.addEventListener('input', applyFilters);

// Filtro de Rango de Precios: aplica filtros al presionar Enter en los campos de min/max
minPriceInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    applyFilters();
  }
});
maxPriceInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    applyFilters();
  }
});
// Y también cuando los valores de los inputs cambian de otra forma (por ejemplo, con flechas arriba/abajo)
minPriceInput.addEventListener("change", applyFilters);
maxPriceInput.addEventListener("change", applyFilters);

// Presets de Rango de Precios (radio buttons): aplica filtros inmediatamente al cambiar preset
pricePresetRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // Al seleccionar un preset, limpiamos los inputs manuales para evitar conflictos visuales
    if (radio.checked) {
      minPriceInput.value = "";
      maxPriceInput.value = "";
    }
    applyFilters(); // Aplicar filtros inmediatamente al cambiar preset
  });
});

// Filtros de Marca (checkboxes): aplica filtros al cambiar selección
brandFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

// Filtros de Valoración (radio buttons): aplica filtros al cambiar selección
ratingFilters.forEach((radio) => {
  radio.addEventListener("change", applyFilters);
});

// Filtro de Disponibilidad (checkbox): aplica filtros al cambiar selección
inStockFilter.addEventListener("change", applyFilters);

// Filtro de Promociones (checkbox): aplica filtros al cambiar selección
promotionFilter.addEventListener("change", applyFilters);

// Ordenar resultados: aplica filtros/ordenamiento al cambiar la selección
sortSelect.addEventListener("change", applyFilters);

// Cargar las tiendas al iniciar la página por primera vez
// Esto asegura que las tiendas se muestren tan pronto como el HTML esté cargado
document.addEventListener("DOMContentLoaded", applyFilters);
