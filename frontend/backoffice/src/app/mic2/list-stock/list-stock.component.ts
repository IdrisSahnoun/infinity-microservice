import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface StockItem {
  id: number;
  itemCode: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  reorderThreshold: number;
  supplierInfo: string;
}

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss']
})
export class ListStockComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  stockItems: StockItem[] = [];
  loading: boolean = true;
  error: string | null = null;

  // CSV import properties
  csvFile: File | null = null;
  importLoading: boolean = false;
  importSuccess: string | null = null;
  importError: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadStockItems();
  }

  loadStockItems(): void {
    this.loading = true;
    this.http.get<StockItem[]>('http://localhost:8088/stock')
        .subscribe({
          next: (data) => {
            this.stockItems = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading stock items:', err);
            this.error = 'Failed to load stock items. Please try again.';
            this.loading = false;
          }
        });
  }

  deleteStockItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://localhost:8088/stock/${id}`)
          .subscribe({
            next: () => {
              this.stockItems = this.stockItems.filter(item => item.id !== id);
              alert('Item deleted successfully');
            },
            error: (err) => {
              console.error('Error deleting item:', err);
              alert('Failed to delete item. Please try again.');
            }
          });
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/stock/add']);
  }

  navigateToUpdate(id: number): void {
    this.router.navigate([`/stock/edit/${id}`]);
  }

  // CSV Export functionality
  exportToCsv(): void {
    // Set the current date in the filename
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `stock_items_${dateStr}.csv`;

    this.http.get('http://localhost:8088/stock/export', {
      responseType: 'blob', // Important: We're getting a file blob
      observe: 'response'
    }).subscribe({
      next: (response) => {
        // Create a blob from the response
        const blob = new Blob([response.body as Blob], { type: 'text/csv' });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      },
      error: (error) => {
        console.error('Error exporting CSV:', error);
        alert('Failed to export CSV. Please try again.');
      }
    });
  }

  // CSV Import functionality
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.csvFile = element.files[0];

      // Auto-submit if file is selected
      if (this.csvFile) {
        this.importCsv();
      }
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  importCsv(): void {
    if (!this.csvFile) {
      return;
    }

    // Check if the file is a CSV
    if (!this.csvFile.name.toLowerCase().endsWith('.csv')) {
      this.importError = 'Please select a CSV file';
      return;
    }

    this.importLoading = true;
    this.importSuccess = null;
    this.importError = null;

    // Create form data
    const formData = new FormData();
    formData.append('file', this.csvFile);

    this.http.post('http://localhost:8088/stock/import', formData)
        .subscribe({
          next: (response: any) => {
            this.importLoading = false;
            this.importSuccess = response;
            this.csvFile = null;
            this.fileInput.nativeElement.value = '';

            // Reload the stock items after successful import
            this.loadStockItems();
          },
          error: (error) => {
            this.importLoading = false;
            this.importError = error.error || 'Failed to import CSV. Please try again.';
            this.csvFile = null;
            this.fileInput.nativeElement.value = '';
          }
        });
  }

  clearImportMessages(): void {
    this.importSuccess = null;
    this.importError = null;
  }
}