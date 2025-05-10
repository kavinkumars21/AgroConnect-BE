package com.agroconnect.cart_service.Controller;

import com.agroconnect.cart_service.Model.Cart;
import com.agroconnect.cart_service.Model.CartItem;
import com.agroconnect.cart_service.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{buyerId}")
    public ResponseEntity<Cart> getCart(@PathVariable String buyerId) {
        return ResponseEntity.ok(cartService.getCartByBuyerId(buyerId));
    }

    @PostMapping("/{buyerId}/items")
    public ResponseEntity<Cart> addItem(@PathVariable String buyerId, @RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addItemToCart(buyerId, item));
    }

    @PutMapping("/{buyerId}/items/{itemId}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable String buyerId,
                                               @PathVariable String itemId,
                                               @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(buyerId, itemId, quantity));
    }

    @DeleteMapping("/{buyerId}/items/{itemId}")
    public ResponseEntity<Cart> removeCartItem(@PathVariable String buyerId,
                                               @PathVariable String itemId) {
        return ResponseEntity.ok(cartService.removeCartItem(buyerId, itemId));
    }
}
