import { Component, inject } from '@angular/core';
import { CreateService } from '../../services/create.service';
import { GetAllService } from '../../services/get-all.service';
import { DeleteService } from '../../services/delete.service';
import { UpdateService } from '../../services/update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Environments } from '../../environments';
import { IValidator } from '../../interfaces/validator.interface';
import { IResponse } from '../../interfaces/response.interface';
import { tap } from 'rxjs';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { IResponseMenu, ISendMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  imports: [TableComponent, FormComponent, ModalComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private createMenu = inject(CreateService);
  private getMenus = inject(GetAllService);
  private deleteMenus = inject(DeleteService);
  private updateMenu = inject(UpdateService);
  private formBuilder = inject(FormBuilder);

  public url = Environments.API_URL + '/menus';

  public message: string = '';
  public title: string = '';
  public action: string = '';

  
  public users: IResponseMenu[] = [];
  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ]

  public isModalOpen: boolean = false;

  openModal(event: boolean) {
    this.isModalOpen = event;
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dishes: [null],
  });

  public controls: IValidator[] = [
    {text: 'Nombre del Menú', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Desayuno', isMultiline: false},
    {text: 'Descripción', type: 'textarea', inputType: "textarea", controlName: 'description', placeholder: 'Desayuno fantástico', isMultiline: true},
  ];

  ngOnInit(): void {
    this.submit();
    this.getAllMenus();
  }

  create() {
    this.action = 'Crear';
    this.title = 'Crear Menú';

    if (this.form.valid) {
      this.createMenu.execute<IResponse>(this.url, this.form.getRawValue() as unknown as ISendMenu)
      .pipe(
        tap(result => {
          this.message = 'Menú creado correctamente'; 
          this.getAllMenus();

          setTimeout(() => {
            this.form.reset();
            this.message = '';
            this.isModalOpen = false;
          }, 1500);
        })
      ).subscribe(console.log);
    }
  }

  getAllMenus(): void {
    this.getMenus.execute<IResponseMenu[]>(this.url)
    .pipe(
      tap(result => this.users = result)
    ).subscribe(console.log);
  }

  updateById(menuId: number): void {
    this.message = '';
    this.action = 'Actualizar';
    this.title = 'Actualizar Menú';
    const menu = this.users.find(user => user.id === menuId);

    this.form.patchValue({
      id: menuId,
      name: menu?.name,
      description: menu?.description,
    });
    this.isModalOpen = true;
  }

  update(menuId: number): void {
    if (this.form.valid) {
      this.updateMenu.execute<IResponse>(this.url + "/" + menuId, this.form.getRawValue() as unknown as ISendMenu)
        .pipe(
          tap(result => {
            this.message = 'Menú actualizado correctamente'; 
            this.getAllMenus();
  
            setTimeout(() => {
              this.form.reset();
              this.message = '';
              this.isModalOpen = false;
            }, 1500);
            })
        ).subscribe(console.log);
    }
  }

  submit(): void {
    if (this.form.value.id === null) {
      this.create();
    } else {
      this.update(this.form.value.id);
    }
  }

  deleteById(menuId: number): void {
    this.deleteMenus.execute<IResponse>(this.url + "/" + menuId)
      .pipe(
        tap(result => this.getAllMenus())
      ).subscribe();
  }
}
