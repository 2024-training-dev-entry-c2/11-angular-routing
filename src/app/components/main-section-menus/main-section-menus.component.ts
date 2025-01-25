import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { IMenu } from '../../interface/menus.interface';
import { DataManagementService } from '../../services/data.service';
import { getMenusService } from '../../services/menus.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDishService } from '../../services/dishes.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-main-section-menus',
  imports: [CurrencyPipe, ModalComponent, CommonModule],
  templateUrl: './main-section-menus.component.html',
  styleUrl: './main-section-menus.component.scss',
})
export class MainSectionMenusComponent {
  public data: any;
  public menuData: Observable<IMenu[]>;
  public tableContent = input<string[]>();
  private formBuilder = inject(FormBuilder);
  private inputService = inject(getMenusService);

  formData = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Description', valueLabel: 'description', type: 'text' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IMenu>,
    private menuService: getMenusService,
    private modalService: ModalService
  ) {
    this.menuData = this.dataManagementService.data$;
  }

  public menuForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
  });

  ngOnInit() {
    this.menuService.getData().subscribe();
  }

  abrirModalEditar() {
    this.modalService.openModal();
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
}
