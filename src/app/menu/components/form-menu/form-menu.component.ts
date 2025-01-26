import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from '../../../form-group/components/form-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CreateMenuService } from '../../services/create-menu.service';
import { IMenu, IMenuResponse } from '../../interfaces/menu.interface';
import { UpdateMenuService } from '../../services/update-menu.service';

@Component({
  selector: 'app-form-menu',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss',
})
export class FormMenuComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private createMenuService = inject(CreateMenuService);
  private updateMenuService = inject(UpdateMenuService);

  @Input() public selectedMenu: IMenuResponse | null = null;

  @Output() public closeModal = new EventEmitter<void>();
  @Output() public menuSaved = new EventEmitter<IMenuResponse>();
  @Output() public menuUpdated = new EventEmitter<IMenuResponse>();
  @Output() public clearSelected = new EventEmitter<void>();

  isSubmitted = false;
  faX = faX;

  menuForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedMenu) {
      this.menuForm = this.formBuilder.group({
        menuName: [this.selectedMenu.menuName, Validators.required],
        description: [this.selectedMenu.description, Validators.required],
        active: this.selectedMenu.active,
      });
    } else {
      this.menuForm = this.formBuilder.group({
        menuName: ['', Validators.required],
        description: ['', Validators.required],
        active: true,
      });
    }
  }

  get menuNameControl(): FormControl {
    return this.menuForm!.get('menuName') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.menuForm!.get('description') as FormControl;
  }

  close(): void {
    this.clearSelected.emit();
    this.closeModal.emit();
  }

  saveMenu(event: Event): void {
    event.preventDefault();
    if (!this.menuForm!.valid) {
      this.isSubmitted = true;
      return;
    }
    if (this.selectedMenu) {
      this.updateMenuService
        .execute(
          this.selectedMenu.id,
          this.menuForm!.getRawValue() as unknown as IMenu
        )
        .subscribe((updatedMenu) => {
          this.menuUpdated.emit(updatedMenu);
          this.closeModal.emit();
        });
    } else {
      this.createMenuService
        .execute(this.menuForm!.getRawValue() as unknown as IMenu)
        .subscribe((newMenu) => {
          this.menuSaved.emit(newMenu);
          this.closeModal.emit();
        });
    }
  }
}
