import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Observable, tap } from 'rxjs';
import { IDishes } from '../../interface/dishes.interface';
import { DataManagementService } from '../../services/data.service';
import { getMenusService } from '../../services/menus.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDishService } from '../../services/dishes.service';

@Component({
  selector: 'app-main-section-dishes',
  imports: [CurrencyPipe, ModalComponent, CommonModule],
  templateUrl: './main-section-dishes.component.html',
  styleUrl: './main-section-dishes.component.scss',
})
export class MainSectionDishesComponent {
  modalTitle = 'Editar Cliente';
  clientName = '';
  public data: any;
  public dishData: Observable<IDishes[]>;
  public tableContent = input<string[]>();
  private formBuilder = inject(FormBuilder);
  private inputService = inject(getDishService);

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Price', valueLabel: 'price' },
    { labelName: 'MenuId', valueLabel: 'menuId' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IDishes>,
    private dishService: getDishService,
    private modalService: ModalService
  ) {
    this.dishData = this.dataManagementService.data$;
  }

  public dishForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    menuId: ['', [Validators.required]],
  });

  ngOnInit() {
    this.dishService.getData().subscribe();
  }

  abrirModalEditar() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSave(): void {
    if (this.dishForm.valid) {
      this.inputService
        .postData(this.dishForm.value as unknown as IDishes)
        .pipe(tap((result) => console.log(result)))
        .subscribe();
    }
    this.closeModal();
  }
}
