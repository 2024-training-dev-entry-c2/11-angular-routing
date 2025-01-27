import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { MenusService } from '../../../services/menu/menus.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Menu } from '../../../interfaces/menu.interface';

@Component({
  selector: 'app-add-menu',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.scss',
})
export class AddMenuComponent  implements OnInit{

  public menu = inject(MenusService);
  private menuFormBuilder = inject(FormBuilder);
  showModal = false;
  @Input() getData: any = [];
  @Input() getMenuId: number = 0;
  @Input() showModalMenu!: boolean;
  @Output() closeModalMenu = new EventEmitter<void>();

  ngOnInit(): void {
    this.setValue();
  }

  public menuUpdatedForm = this.menuFormBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    dishfoods: this.menuFormBuilder.array([], [Validators.required]),
    
  });
  setValue(): void {
    const dishfoodsArray = this.menuUpdatedForm.get('dishfoods') as FormArray;
    
    dishfoodsArray.clear();
    if (this.getData.dishfoods && Array.isArray(this.getData.dishfoods)) {
      this.getData.dishfoods.forEach((dish: any) => {
        dishfoodsArray.push(
          this.menuFormBuilder.control(dish.name, Validators.required)
        );
      });
    }
    if (this.getData.name && this.getData.name != null) {
      this.menuUpdatedForm.patchValue({
        id: this.getData.id,
        name: this.getData.name,
      });
    }
    this.menuUpdatedForm.get('dishfoods')?.disable();
    this.showModal = true;
  }
  updateMenu() {
if (this.menuUpdatedForm.valid) {
  const updatePayload = {
    name: this.menuUpdatedForm.get('name')?.value,
  };
  this.menu
    .updateMenu(updatePayload as unknown as Menu, this.getMenuId)
    .subscribe({
      next: (data) => {
        console.log(data);
        alert('Menu updated successfully');
        this.showModal = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
}
  }
  closeModal() {
    this.closeModalMenu.emit();
  }
}
