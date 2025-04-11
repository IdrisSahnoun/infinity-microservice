package tn.esprit.microservice.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice.entities.StockItem;
import tn.esprit.microservice.services.StockService;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/stock")  // Define a proper base path
public class StockItemController {

    private final StockService stockItemService;

    @Autowired
    public StockItemController(StockService stockItemService) {
        this.stockItemService = stockItemService;
    }

    @GetMapping  // This will handle /stock
    public ResponseEntity<List<StockItem>> getAllStockItems() {
        List<StockItem> stockItems = stockItemService.getAllStockItems();
        return new ResponseEntity<>(stockItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")  // This will handle /stock/{id}
    public ResponseEntity<StockItem> getStockItemById(@PathVariable Long id) {
        Optional<StockItem> stockItem = stockItemService.getStockItemById(id);
        return stockItem.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/code/{itemCode}")
    public ResponseEntity<StockItem> getStockItemByCode(@PathVariable String itemCode) {
        StockItem stockItem = stockItemService.getStockItemByItemCode(itemCode);
        if (stockItem != null) {
            return new ResponseEntity<>(stockItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<StockItem> createStockItem(@RequestBody StockItem stockItem) {
        if (stockItemService.existsByItemCode(stockItem.getItemCode())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        StockItem createdStockItem = stockItemService.createStockItem(stockItem);
        return new ResponseEntity<>(createdStockItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockItem> updateStockItem(@PathVariable Long id, @RequestBody StockItem stockItem) {
        Optional<StockItem> existingStockItem = stockItemService.getStockItemById(id);
        if (existingStockItem.isPresent()) {
            stockItem.setId(id);
            StockItem updatedStockItem = stockItemService.updateStockItem(stockItem);
            return new ResponseEntity<>(updatedStockItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockItem(@PathVariable Long id) {
        Optional<StockItem> existingStockItem = stockItemService.getStockItemById(id);
        if (existingStockItem.isPresent()) {
            stockItemService.deleteStockItem(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}