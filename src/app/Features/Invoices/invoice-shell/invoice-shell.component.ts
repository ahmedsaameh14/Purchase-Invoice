import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from '../Data/mock-data';

@Component({
  selector: 'app-invoice-shell',
  standalone: true,
  imports: [],
  templateUrl: './invoice-shell.component.html',
  styleUrl: './invoice-shell.component.scss'
})
export class InvoiceShellComponent implements OnInit {
  invoiceForm!: FormGroup;
  products = MOCK_PRODUCTS;
  suppliers = MOCK_SUPPLIERS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.invoiceForm = this.fb.group({
      // Header of Invoice
      header: this.fb.group({
        invoiceDate: [new Date(), Validators.required],
        supplierName: ['', Validators.required],
        notes: ['']
      }),
      
      // Items table of Invoice - fb.array because i don't know number of items
      items: this.fb.array([]),

      // Total of All Invoice
      grandTotal: [{ value: 0, disabled: true }]
    });

    // Add one empty row by default so the table isn't empty on load
    this.addItemRow();
  }

  // get the items array
  get itemsFormArray(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Add a new row
  addItemRow() {
    const row = this.fb.group({
      itemCode: ['', Validators.required],
      itemName: [{ value: '', disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, Validators.required],
      lineTotal: [{ value: 0, disabled: true }]
    });
    this.itemsFormArray.push(row);
  }
}
