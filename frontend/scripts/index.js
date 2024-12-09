const apiUrl = "http://localhost:8080/api/products";
const productList = document.getElementById("product-list");

// Function to reset other filters
function resetOtherFilters(exclude) {
  if (exclude !== "brand") {
    document.getElementById("brand").value = "all";
  }
  if (exclude !== "category") {
    document.getElementById("category").value = "all";
  }
  if (exclude !== "sort") {
    document.getElementById("sort").value = "name-asc";
  }
}

async function fetchFilteredProducts(selectedFilter) {
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;

  // Reset other filters
  resetOtherFilters(selectedFilter);

  let url = apiUrl;

  // Apply filtering and sorting
  if (selectedFilter === "brand" && brand !== "all") {
    url = `${apiUrl}/search/brand?brand=${brand}`;
  } else if (selectedFilter === "category" && category !== "all") {
    url = `${apiUrl}/search/category?categoryName=${category}`;
  } else if (selectedFilter === "sort") {
    // Sorting logic
    switch (sort) {
      case "name-asc":
        url = `${apiUrl}/products/sort/name/asc`;
        break;
      case "name-desc":
        url = `${apiUrl}/products/sort/name/desc`;
        break;
      case "price-asc":
        url = `${apiUrl}/products/sort/price/asc`;
        break;
      case "price-desc":
        url = `${apiUrl}/products/sort/price/desc`;
        break;
      default:
        break;
    }
  } else {
    url = apiUrl; // Default to fetching all products
  }

  // Fetch filtered products
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    updateProductList(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    productList.innerHTML = "<p>Unable to load products. Please try again later.</p>";
  }
}

// Update product list dynamically
function updateProductList(products) {
  productList.innerHTML = ""; // Clear current products

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `
      <div class="product-card">
        <figure class="card-banner">
          <a href="frontend/pages/product.html?id=${product.id}">
            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" width="800" height="1034" class="w-100">
          </a>
          <div class="card-actions">
            <button class="card-action-btn cart-btn">
              <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
              <p>Add to Cart</p>
            </button>
          </div>
        </figure>
        <div class="card-content">
          <h3 class="h3 card-title">
            <a href="#">${product.name}</a>
          </h3>
          <div class="card-price">
            <data class="item-price" value="${product.price}">$${product.price.toFixed(2)}</data>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(productItem);
  });
}

// Add event listeners for filters
document.getElementById("brand").addEventListener("change", () => fetchFilteredProducts("brand"));
document.getElementById("category").addEventListener("change", () => fetchFilteredProducts("category"));
document.getElementById("sort").addEventListener("change", () => fetchFilteredProducts("sort"));

// Initial fetch
fetchFilteredProducts();