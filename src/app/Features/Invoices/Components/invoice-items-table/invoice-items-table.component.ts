import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../Models/product.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-invoice-items-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './invoice-items-table.component.html',
  styleUrl: './invoice-items-table.component.css',
})
export class InvoiceItemsTableComponent {
  @Input() itemsFormArray!: FormArray;
  @Input() products: Product[] = [];
  @Input() canAddItem = true;

  removeRow(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  @Output() addRow = new EventEmitter<void>();

  addNewRow() {
    this.addRow.emit();
  }

  get parentForm(): FormGroup {
    return this.itemsFormArray.parent as FormGroup;
  }
}
