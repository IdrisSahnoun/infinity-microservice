package tn.esprit.microservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.microservice.entities.StockItem;
import tn.esprit.microservice.services.CsvExportService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/stock")
public class CsvController {

    private final CsvExportService csvExportService;

    @Autowired
    public CsvController(CsvExportService csvExportService) {
        this.csvExportService = csvExportService;
    }

    @GetMapping("/export")
    public ResponseEntity<InputStreamResource> exportCSV() {
        try {
            // Generate the CSV file
            ByteArrayInputStream csvStream = csvExportService.exportToCsv();

            // Set up HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=stock_items.csv");
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);

            // Return the response with the CSV data
            return new ResponseEntity<>(
                    new InputStreamResource(csvStream),
                    headers,
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/import")
    public ResponseEntity<?> importCSV(@RequestParam("file") MultipartFile file) {
        // Check if the file is a CSV
        if (!file.getOriginalFilename().endsWith(".csv")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please upload a CSV file");
        }

        try {
            // Process the CSV file and import items
            List<StockItem> importedItems = csvExportService.importFromCsv(file);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Successfully imported " + importedItems.size() + " stock items");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to import CSV: " + e.getMessage());
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid data format in CSV: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }
}