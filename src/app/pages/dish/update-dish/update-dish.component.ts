import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DishService } from '../../../services/dish/dish.service';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Dishfood, DishfoodRequest } from '../../../interfaces/menu.interface';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-update-dish',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './update-dish.component.html',
  styleUrl: './update-dish.component.scss',
})
export class UpdateDishComponent implements OnInit {
  ngOnInit(): void {
    this.setValue();
  }

  public dishfood = inject(DishService);
  private formAddBuilder = inject(FormBuilder);

  showModal = false;
  @Input() getData: DishfoodRequest | any = '';
  @Input() getMenuid: number = 0;
  @Input() showModalDish!: boolean;
  @Output() closeModalDish = new EventEmitter<void>();

  public dishfoodUpdatedForm = this.formAddBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [10.0, [Validators.required]],
    isPopular: [false],
    menu: [{ value: this.getMenuid, disabled: true }, [Validators.required]],
    orderList: this.formAddBuilder.array([]),
  });

  setValue(): void {
    const orderIdsArray = this.dishfoodUpdatedForm.get(
      'orderList'
    ) as FormArray;
    orderIdsArray.clear();
    if (this.getData.orderList && Array.isArray(this.getData.orderList)) {
      this.getData.orderList.forEach((orderId: number) => {
        orderIdsArray.push(
          this.formAddBuilder.control(orderId, Validators.required)
        );
      });
    }
    this.dishfoodUpdatedForm.patchValue({
      id: this.getData.id,
      name: this.getData.name,
      price: this.getData.price,
      menu: this.getData.menu,
      isPopular: this.getData.isPopular,
    });
    orderIdsArray.disable();
  }

  updateMenu() {
    if (this.dishfoodUpdatedForm.valid) {
      const updatePayload = {
        name: this.dishfoodUpdatedForm.get('name')?.value,
        price: this.dishfoodUpdatedForm.get('price')?.value,
        isPopular: this.dishfoodUpdatedForm.get('isPopular')?.value,
        menuId: this.getMenuid,
      };
      this.dishfood
        .updateDish(updatePayload as unknown as Dishfood, this.getData.id)
        .subscribe({
          next: (data) => {
            console.log(data);
            alert('Dishfood updated successfully');
            this.showModal = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  closeModal() {
    this.closeModalDish.emit();
  }
}
