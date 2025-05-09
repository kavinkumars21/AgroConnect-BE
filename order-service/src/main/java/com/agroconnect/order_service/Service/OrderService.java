package com.agroconnect.order_service.Service;

import com.agroconnect.order_service.Client.BuyerClient;
import com.agroconnect.order_service.Dto.ListingSummaryDTO;
import com.agroconnect.order_service.Dto.OrderRequest;
import com.agroconnect.order_service.Dto.OrderResponse;
import com.agroconnect.order_service.Model.Order;
import com.agroconnect.order_service.Model.OrderStatus;
import com.agroconnect.order_service.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final BuyerClient buyerClient;

    public OrderResponse placeOrder(OrderRequest request) {
        // Retrieve all listings from Buyer Service
        List<ListingSummaryDTO> listings = buyerClient.getAllListings();

        // Find the specific listing by ID
        ListingSummaryDTO listing = listings.stream()
                .filter(l -> l.id().equals(request.listingId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Listing not found!"));

        // Check if the requested quantity is available
        if (request.quantity() > listing.quantityAvailable()) {
            throw new RuntimeException("Insufficient quantity available. Available: " + listing.quantityAvailable());
        }

        // Reduce the listing's available quantity via Buyer Service
        buyerClient.reduceListingQuantity(request.listingId(), request.quantity());

        // Calculate total price (pricePerKg * quantity)
        BigDecimal totalPrice = listing.pricePerKg().multiply(BigDecimal.valueOf(request.quantity()));

        // Create and save the order
        Order order = new Order();
        order.setBuyerId(request.buyerId());
        order.setListingId(request.listingId());
        order.setFarmerId(listing.farmerId());
        order.setQuantity(request.quantity());
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);
        return new OrderResponse(
                savedOrder.getId(),
                savedOrder.getListingId(),
                savedOrder.getFarmerId(),
                savedOrder.getQuantity(),
                savedOrder.getTotalPrice(),
                savedOrder.getStatus()
        );
    }

    public List<OrderResponse> getOrdersByBuyer(String buyerId) {
        List<Order> orders = orderRepository.findByBuyerId(buyerId);
        return orders.stream()
                .map(order -> new OrderResponse(
                        order.getId(),
                        order.getListingId(),
                        order.getFarmerId(),
                        order.getQuantity(),
                        order.getTotalPrice(),
                        order.getStatus()
                ))
                .collect(Collectors.toList());
    }
}
