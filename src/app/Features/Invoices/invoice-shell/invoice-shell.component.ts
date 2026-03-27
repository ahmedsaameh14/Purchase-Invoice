import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For pipes like | currency
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from '../Data/mock-data';
import { InvoiceHeaderComponent } from '../Components/invoice-header/invoice-header.component';
import { InvoiceItemsTableComponent } from '../Components/invoice-items-table/invoice-items-table.component';
import { CreateInvoiceRequest } from '../Models/invoice.model';

@Component({
  selector: 'app-invoice-shell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    InvoiceHeaderComponent,
    InvoiceItemsTableComponent,
  ],
  templateUrl: './invoice-shell.component.html',
  styleUrl: './invoice-shell.component.css',
})
export class InvoiceShellComponent implements OnInit {
  invoiceForm!: FormGroup;
  products = MOCK_PRODUCTS;
  suppliers = MOCK_SUPPLIERS;
  private itemsValueChangesSub?: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormListeners();
  }

  private initForm() {
    this.invoiceForm = this.fb.group({
      // Header of Invoice
      header: this.fb.group({
        invoiceDate: [new Date(), Validators.required],
        supplierId: ['', Validators.required],
        notes: [''],
      }),

      // Items table of Invoice - fb.array because i don't know number of items
      items: this.fb.array([]),

      // Total of All Invoice
      grandTotal: [{ value: 0, disabled: true }],
    });

    // Add one empty row by default so the table isn't empty on load
    this.addItemRow();
  }

  // get the items array
  get itemsFormArray(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  // get the Header data
  get headerGroup(): FormGroup {
    return this.invoiceForm.get('header') as FormGroup;
  }

  get canAddItem(): boolean {
    const items = this.itemsFormArray.controls;
    if (!items.length) {
      return true;
    }
    const lastItemCode = items[items.length - 1].get('itemCode')?.value;
    return !!lastItemCode;
  }

  // Add a new row
  addItemRow() {
    const row = this.fb.group({
      itemCode: ['', Validators.required],
      itemName: [{ value: '', disabled: true }],
      quantity: [{ value: 1, disabled: true }, [Validators.required, Validators.min(1)]],
      unitPrice: [{ value: 0, disabled: true }, Validators.required],
      lineTotal: [{ value: 0, disabled: true }],
    });

    this.trackItemCodeState(row);
    this.itemsFormArray.push(row);
  }

  private trackItemCodeState(row: FormGroup) {
    row.get('itemCode')?.valueChanges.subscribe((code: string) => {
      if (code) {
        row.get('quantity')?.enable({ emitEvent: false });
        row.get('unitPrice')?.enable({ emitEvent: false });
      } else {
        row.get('quantity')?.disable({ emitEvent: false });
        row.get('unitPrice')?.disable({ emitEvent: false });
        row.get('itemName')?.setValue('');
        row.get('lineTotal')?.setValue(0);
      }
    });
  }

  resetInvoice() {
    this.itemsValueChangesSub?.unsubscribe();
    this.initForm();
    this.setupFormListeners();
  }

  private setupFormListeners() {
    this.itemsValueChangesSub?.unsubscribe();
    this.itemsValueChangesSub = this.itemsFormArray.valueChanges.subscribe((values: any[]) => {
      let grandTotal = 0;

    values.forEach((item, index) => {
      // 1. Find Product
      const selectedProduct = this.products.find(p => p.code === item.itemCode);
      const row = this.itemsFormArray.at(index);

      if (selectedProduct && row.get('itemName')?.value !== selectedProduct.name) {
        row.patchValue({
          itemName: selectedProduct.name,
          unitPrice: selectedProduct.unitPrice
        }, { emitEvent: false });
      }

      // 2. Calculate Line Total
      // Use the latest values from the form row directly to be safe
      const qty = row.get('quantity')?.value || 0;
      const price = row.get('unitPrice')?.value || 0;
      const lineTotal = qty * price;

      row.get('lineTotal')?.patchValue(lineTotal, { emitEvent: false });
      
      // Add to our running grand total
      grandTotal += lineTotal;
    });

    // 3. Update Grand Total
    this.invoiceForm.get('grandTotal')?.patchValue(grandTotal, { emitEvent: false });
  });
}

saveInvoice() {
  if (this.invoiceForm.valid) {
    // Transform data from FormGroup to JSON
    const finalData: CreateInvoiceRequest = this.invoiceForm.getRawValue();
    console.log('Final Invoice Data:', finalData);
    alert('Invoice Saved Successfully! Check the console.');
  } else {
    this.invoiceForm.markAllAsTouched();
    alert('Please fill all required fields.');
  }
}
}
