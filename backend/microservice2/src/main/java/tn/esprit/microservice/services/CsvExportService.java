package tn.esprit.microservice.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.microservice.entities.StockItem;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class CsvExportService {

    private final StockService stockService;

    @Autowired
    public CsvExportService(StockService stockService) {
        this.stockService = stockService;
    }

    public ByteArrayInputStream exportToCsv() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PrintWriter writer = new PrintWriter(out);

            // Write header
            writer.println("id,itemCode,itemName,description,quantity,price,reorderThreshold,supplierInfo");

            // Write data rows
            List<StockItem> stockItems = stockService.getAllStockItems();
            for (StockItem item : stockItems) {
                writer.println(
                        item.getId() + "," +
                                item.getItemCode() + "," +
                                item.getItemName() + "," +
                                item.getDescription() + "," +
                                item.getQuantity() + "," +
                                item.getPrice() + "," +
                                item.getReorderThreshold() + "," +
                                item.getSupplierInfo()
                );
            }

            writer.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Failed to export data to CSV file: " + e.getMessage());
        }
    }

    public List<StockItem> importFromCsv(MultipartFile file) throws IOException {
        List<StockItem> importedItems = new ArrayList<>();

        try (Scanner scanner = new Scanner(file.getInputStream())) {
            // Skip header line
            if (scanner.hasNextLine()) {
                scanner.nextLine();
            }

            // Process data rows
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] values = line.split(",");

                if (values.length >= 7) {
                    StockItem item = new StockItem();
                    item.setItemCode(values[1]);
                    item.setItemName(values[2]);
                    item.setDescription(values[3]);
                    item.setQuantity(Integer.parseInt(values[4]));
                    item.setPrice(Double.parseDouble(values[5]));
                    item.setReorderThreshold(Integer.parseInt(values[6]));

                    if (values.length > 7) {
                        item.setSupplierInfo(values[7]);
                    }

                    importedItems.add(stockService.createStockItem(item));
                }
            }
        }

        return importedItems;
    }
}