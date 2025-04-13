package tn.esprit.microservice.services;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.entities.StockItem;
import tn.esprit.microservice.repositories.StockRepository;

import java.util.List;
import java.util.Optional;


@Service
public class StockService {
    private final StockRepository stockItemRepository;

    @Autowired
    public StockService(StockRepository stockItemRepository) {
        this.stockItemRepository = stockItemRepository;
    }

    public List<StockItem> getAllStockItems() {
        return stockItemRepository.findAll();
    }

    public Optional<StockItem> getStockItemById(Long id) {
        return stockItemRepository.findById(id);
    }

    public StockItem getStockItemByItemCode(String itemCode) {
        return stockItemRepository.findByItemCode(itemCode);
    }

    public StockItem createStockItem(StockItem stockItem) {
        return stockItemRepository.save(stockItem);
    }

    public StockItem updateStockItem(StockItem stockItem) {
        return stockItemRepository.save(stockItem);
    }

    public void deleteStockItem(Long id) {
        stockItemRepository.deleteById(id);
    }

    public boolean existsByItemCode(String itemCode) {
        return stockItemRepository.existsByItemCode(itemCode);
    }
}