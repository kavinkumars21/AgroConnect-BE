package com.agroconnect.order_service.Service;

import com.agroconnect.order_service.Client.CartServiceClient;
import com.agroconnect.order_service.Client.FarmerServiceClient;
import com.agroconnect.order_service.Dto.CartDTO;
import com.agroconnect.order_service.Dto.CartItemDTO;
import com.agroconnect.order_service.Dto.OrderItemDTO;
import com.agroconnect.order_service.Dto.OrderRequest;
import com.agroconnect.order_service.Dto.OrderResponse;
import com.agroconnect.order_service.Model.Order;
import com.agroconnect.order_service.Model.OrderItem;
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
    private final CartServiceClient cartServiceClient;
    private final FarmerServiceClient farmerServiceClient;

    public OrderResponse placeOrder(OrderRequest request) {
        CartDTO cart = cartServiceClient.getCartByBuyerId(request.buyerId());
        if (cart == null || cart.items().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        for (CartItemDTO item : cart.items()) {
            var listing = farmerServiceClient.getListingDetails(item.listingId());
            if(item.quantity() > listing.quantityAvailable()) {
                throw new RuntimeException("Insufficient stock for listing: " + item.listingId());
            }
        }
        for (CartItemDTO item : cart.items()) {
            farmerServiceClient.reduceProductQuantity(item.listingId(), item.quantity());
        }

        List<OrderItem> orderItems = cart.items().stream()
                .map(item -> new OrderItem(
                        item.listingId(),
                        item.quantity(),
                        item.pricePerKg(),
                        item.pricePerKg().multiply(new BigDecimal(item.quantity()))
                ))
                .collect(Collectors.toList());

        BigDecimal totalPrice = orderItems.stream()
                .map(OrderItem::getItemTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setBuyerId(request.buyerId());
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);

        List<OrderItemDTO> orderItemDTOs = savedOrder.getItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getListingId(),
                        item.getQuantity(),
                        item.getPricePerKg(),
                        item.getItemTotalPrice()
                ))
                .collect(Collectors.toList());

        return new OrderResponse(
                savedOrder.getId(),
                savedOrder.getBuyerId(),
                orderItemDTOs,
                savedOrder.getTotalPrice(),
                savedOrder.getStatus()
        );
    }

    public List<OrderResponse> getOrdersByBuyer(String buyerId) {
        List<Order> orders = orderRepository.findByBuyerId(buyerId);
        return orders.stream().map(order -> {
            List<OrderItemDTO> dtoItems = order.getItems().stream()
                    .map(item -> new OrderItemDTO(
                            item.getListingId(),
                            item.getQuantity(),
                            item.getPricePerKg(),
                            item.getItemTotalPrice()))
                    .collect(Collectors.toList());
            return new OrderResponse(order.getId(), order.getBuyerId(), dtoItems,
                    order.getTotalPrice(), order.getStatus());
        }).collect(Collectors.toList());
    }
}
