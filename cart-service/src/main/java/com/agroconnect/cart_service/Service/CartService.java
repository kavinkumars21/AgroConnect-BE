package com.agroconnect.cart_service.Service;

import com.agroconnect.cart_service.Client.FarmerServiceClient;
import com.agroconnect.cart_service.Dto.ListingSummaryDTO;
import com.agroconnect.cart_service.Model.Cart;
import com.agroconnect.cart_service.Model.CartItem;
import com.agroconnect.cart_service.Repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final FarmerServiceClient farmerServiceClient;

    public Cart getCartByBuyerId(String buyerId) {
        return cartRepository.findById(buyerId).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setBuyerId(buyerId);
            cart.setItems(new ArrayList<>());
            return cart;
        });
    }

    public Cart addItemToCart(String buyerId, CartItem item) {
        ListingSummaryDTO listing = farmerServiceClient.getListingDetails(item.getListingId());
        if (listing == null) {
            throw new RuntimeException("Listing not found");
        }
        item.setPricePerKg(listing.pricePerKg());
        if (item.getId() == null || item.getId().isEmpty()) {
            item.setId(UUID.randomUUID().toString());
        }
        Cart cart = getCartByBuyerId(buyerId);
        cart.getItems().add(item);
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public Cart updateCartItem(String buyerId, String itemId, int newQuantity) {
        Cart cart = getCartByBuyerId(buyerId);
        cart.getItems().forEach(item -> {
            if (item.getId().equals(itemId)) {
                item.setQuantity(newQuantity);
            }
        });
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public Cart removeCartItem(String buyerId, String itemId) {
        Cart cart = getCartByBuyerId(buyerId);
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }
}
