import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Observable, Subscription, tap } from 'rxjs';
import { IDishes } from '../../interface/dishes.interface';
import { DataManagementService } from '../../services/data.service';
import { getMenusService } from '../../services/menus.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDishService } from '../../services/dishes.service';
import { ModalActionDeleteComponent } from '../modal-action-delete/modal-action-delete.component';
import { ModalDeleteService } from '../../services/modal-delete.service';
import { IMenu } from '../../interface/menus.interface';
import { ModalEditService } from '../../services/modal-edit.service';
import { ModalActionEditComponent } from '../modal-action-edit/modal-action-edit.component';

@Component({
  selector: 'app-main-section-dishes',
  imports: [
    CurrencyPipe,
    ModalComponent,
    CommonModule,
    ModalActionDeleteComponent,
    ModalActionEditComponent,
  ],
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
  private subscription!: Subscription;
  private dishToDeleteSubscription!: Subscription;
  private dishToDelete: IDishes | null = null;
  private dishToEditSubscription!: Subscription;
  private dishToEdit: IDishes | null = null;
  onSaveTest = output<void>();

  public dishForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    menuId: [''],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Price', valueLabel: 'price' },
    { labelName: 'MenuId', valueLabel: 'menuId' },
  ];

  editData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Price', valueLabel: 'price' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IDishes>,
    private dishService: getDishService,
    private modalService: ModalService,
    private deleteModalService: ModalDeleteService,
    private editModalService: ModalEditService
  ) {
    this.dishData = this.dataManagementService.data$;
  }

  ngOnInit() {
    this.dishService.getData().subscribe();
    this.dishToDeleteSubscription = this.dishService
      .getDishToDelete()
      .subscribe((dish) => {
        this.dishToDelete = dish;
      });

    this.dishToEditSubscription = this.dishService
      .getDishtToEdit()
      .subscribe((dishEdit) => {
        this.dishToEdit = dishEdit;
      });
  }

  openAddModal() {
    this.modalService.openModal();
  }

  openDeleteModal(dish: IDishes) {
    this.deleteModalService.openModal();
    this.dishService.setDishToDelete(dish);
  }

  openEditModal(dishEdit: IDishes) {
    this.dishForm.patchValue({
      name: dishEdit.name,
      price: dishEdit.price.toString(),
    });

    this.editModalService.openModal();
    this.dishService.setDishToEdit(dishEdit);
  }

  closeModal() {
    this.deleteModalService.closeModal();
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

  deleteData() {
    if (this.dishToDelete) {
      this.dishService.deleteData(this.dishToDelete.id).subscribe({
        next: () => {
          this.deleteModalService.closeModal();
          console.log('Deleted successfully');
        },
        error: (error) => {
          console.error('Delete failed', error);
        },
      });
    }
  }

  onSaveEdit() {
    if (this.dishToEdit && this.dishForm.valid) {
      this.dishService
        .editData(this.dishToEdit.id, this.dishForm.value as unknown as IDishes)
        .subscribe({
          next: () => {
            this.editModalService.closeModal();
            this.dishForm.reset();
          },
          error: (error) => {
            console.error('Edit failed', error);
          },
        });
    }
  }
}
