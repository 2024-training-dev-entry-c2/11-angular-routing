import { Component, inject } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { IResponseClients} from '../../interfaces/client.interface';
import { GetAllService } from '../../services/get-all.service';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IValidator } from '../../interfaces/validator.interface';
import { Environments } from '../../environments';
import { FormComponent } from "../../components/form/form.component";

@Component({
  selector: 'app-client',
  imports: [TableComponent, FormComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  private getClients = inject(GetAllService);
  private formBuilder = inject(FormBuilder);

  public url = Environments.API_URL + '/clients';

  public title = 'Clientes';
  public users: IResponseClients[] = [];
  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'clientType', header: 'Tipo de cliente' }
  ]

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    userType: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  public controls: IValidator[] = [
    {text: 'Nombre', type: 'text', controlName: 'name'},
    {text: 'Apellido', type: 'text', controlName: 'lastName'},
    {text: 'Correo', type: 'email', controlName: 'email'},
    {text: 'Tipo de Usuario', type: 'text', controlName: 'userType'},
    {text: 'Contraseña', type: 'password', controlName: 'password'},
    {text: 'Confirmar Contraseña', type: 'password', controlName: 'confirmPassword'}
  ];

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.getClients.execute<IResponseClients[]>(this.url)
    .pipe(
      tap(result => this.users = result)
    ).subscribe(console.log);
  }

  updateById(id: number): void {
    console.log('Update:', id);
  }

  deleteById(id: number): void {
    console.log('Delete:', id);
  }
}
