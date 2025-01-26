import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { IMenu } from '../../interface/menus.interface';
import { DataManagementService } from '../../services/data.service';
import { getMenusService } from '../../services/menus.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDishService } from '../../services/dishes.service';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalDeleteService } from '../../services/modal-delete.service';
import { ModalActionDeleteComponent } from '../modal-action-delete/modal-action-delete.component';
import { ModalActionEditComponent } from "../modal-action-edit/modal-action-edit.component";
import { ModalEditService } from '../../services/modal-edit.service';

@Component({
  selector: 'app-main-section-menus',
  imports: [
    CurrencyPipe,
    ModalComponent,
    CommonModule,
    ModalActionDeleteComponent,
    ModalActionEditComponent
],
  templateUrl: './main-section-menus.component.html',
  styleUrl: './main-section-menus.component.scss',
})
export class MainSectionMenusComponent {
  private formBuilder = inject(FormBuilder);
  private inputService = inject(getMenusService);
  private subscription!: Subscription;
  private menuToDeleteSubscription!: Subscription;
  private menuToEditSubscription!: Subscription;
  private menuToEdit: IMenu | null = null;
  private menuToDelete: IMenu | null = null;

  public data: any;
  public menuData: Observable<IMenu[]>;
  public tableContent = input<string[]>();

  public menuForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Description', valueLabel: 'description', type: 'text' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IMenu>,
    private menuService: getMenusService,
    private modalService: ModalService,
    private deleteModalService: ModalDeleteService,
    private editModalService: ModalEditService
  ) {
    this.menuData = this.dataManagementService.data$;
  }

  ngOnInit() {
    this.menuService.getData().subscribe();

    this.menuToDeleteSubscription = this.menuService
      .getMenuToDelete()
      .subscribe((menu) => {
        this.menuToDelete = menu;
      });

      this.menuToEditSubscription = this.menuService
      .getMenuToEdit()
      .subscribe((menuEdit) => {
        this.menuToEdit = menuEdit;
      });
  }

  openAddModal() {
    this.modalService.openModal();
  }

  openDeleteModal(menu: IMenu) {
    this.deleteModalService.openModal();
    this.menuService.setMenuToDelete(menu);
  }


openEditModal(menuEdit: IMenu) {
    this.menuForm.patchValue({
      name: menuEdit.name,
      description: menuEdit.description,
    });

    this.editModalService.openModal();
    this.menuService.setMenuToEdit(menuEdit);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSave(): void {
    if (this.menuForm.valid) {
      this.inputService
        .postData(this.menuForm.value as unknown as IMenu)
        .pipe(tap((result) => console.log(result)))
        .subscribe();
    }
    this.closeModal();
  }

  deleteData() {
    if (this.menuToDelete) {
      this.menuService.deleteData(this.menuToDelete.id).subscribe({
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
      if (this.menuToEdit && this.menuForm.valid) {
        this.menuService
          .editData(this.menuToEdit.id, this.menuForm.value as unknown as IMenu)
          .subscribe({
            next: () => {
              this.editModalService.closeModal();
              this.menuForm.reset();
            },
            error: (error) => {
              console.error('Edit failed', error);
            },
          });
      }
    }


}
