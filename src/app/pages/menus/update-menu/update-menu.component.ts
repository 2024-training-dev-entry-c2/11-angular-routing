import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MenusService } from '../../../services/menu/menus.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Menu, RequestMenu } from '../../../interfaces/menu.interface';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-update-menu',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.scss'
})
export class UpdateMenuComponent {
 public menu = inject(MenusService);
  private menuFormBuilder = inject(FormBuilder);
  showModal = false;
  getData: RequestMenu | any= {"name":""};
  @Input() showModalMenu!: boolean;
  @Output() closeModalMenu = new EventEmitter<void>();


  public menuAddForm = this.menuFormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  addMenu() {
    if (this.menuAddForm.valid) {
      this.menu.addMenu(this.menuAddForm.getRawValue() as unknown as Menu).subscribe({
        next: (data) => {
          console.log(data);
          alert('Menu added successfully');
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
