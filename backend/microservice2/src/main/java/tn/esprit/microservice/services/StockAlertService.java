package tn.esprit.microservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.entities.StockItem;
import tn.esprit.microservice.repositories.StockRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockAlertService {

    private final StockRepository stockItemRepository;
    private  JavaMailSender emailSender;

    @Autowired
    public StockAlertService(StockRepository stockItemRepository) {
        this.stockItemRepository = stockItemRepository;
    }

    @Scheduled(cron = "0 0 9 * * *") // Run daily at 9 AM
    public void checkLowStockItems() {
        List<StockItem> lowStockItems = stockItemRepository.findAll().stream()
                .filter(item -> item.getQuantity() <= item.getReorderThreshold())
                .collect(Collectors.toList());

        if (!lowStockItems.isEmpty()) {
            sendLowStockAlert(lowStockItems);
        }
    }

    private void sendLowStockAlert(List<StockItem> lowStockItems) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("ayarimahdi@outlook.com");
        message.setSubject("Low Stock Alert");

        StringBuilder body = new StringBuilder("The following items are low in stock:\n\n");

        for (StockItem item : lowStockItems) {
            body.append(item.getItemName())
                    .append(" (").append(item.getItemCode()).append(")")
                    .append(" - Current quantity: ").append(item.getQuantity())
                    .append(" (Threshold: ").append(item.getReorderThreshold()).append(")")
                    .append("\n");
        }

        message.setText(body.toString());
        emailSender.send(message);
    }
}
