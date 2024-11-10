package org.elysium.backend.repos;

import org.elysium.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    // Custom query methods

    // Find products by category (corrected to use Integer for categoryId)
    List<Product> findByCategoryName(String name);

    // Find products by brand
    List<Product> findByBrand(String brand);

    // Find products by name (case-insensitive)
    List<Product> findByNameIgnoreCase(String name);

    // Find products with a price less than a certain value
    List<Product> findByPriceLessThan(double price);

    // Find products with a price between a range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    // Find products with a discount
    List<Product> findByDiscountPriceGreaterThan(double discountPrice);

    // Find products by rating greater than or equal to a certain value
    List<Product> findByRatingGreaterThanEqual(double rating);

    Optional<Product> findById(String id);

    List<Product> findAllByOrderByPriceAsc(); // Ascending order
    List<Product> findAllByOrderByPriceDesc(); // Descending order

}
