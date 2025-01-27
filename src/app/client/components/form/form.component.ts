import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  @Input() title: String = '';
  @Input() action: String = '';
  public idCliente?: number;

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    cedula: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idCliente = +idParam;
      }

      if (idParam && this.action === 'update') {
        this.idCliente = +idParam;
        this.loadClientData(this.idCliente);
      }

    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.setNotification('error', 'Formulario invalido');
      console.log(this.form.value);
      return;
    }
    const client: IClient = this.form.value as IClient;

    if (this.action === "save") {
      this.saveClient(client);
    } else if (this.action === "update" && this.idCliente) {
      this.updateClient(this.idCliente, client);
    }
  }

  private loadClientData(id: number): void {
    this.clientService.processClientData(
      id,
      (client) => {
        this.form.patchValue(client);
      },
      (error) => {
        this.notificationService.setNotification('error', 'Error al cargar datos del cliente.');
        console.error('Error al cargar datos del cliente:', error);
      }
    );
  }

  saveClient(client: IClient) {
    this.clientService.save(client).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Cliente guardado con exito');
        this.router.navigate(['clientes']);
      },
      error: (err) => this.notificationService.setNotification('error', 'Error al guardar el cliente'),
    })
  }

  updateClient(idCliente: number, client: IClient) {
    this.clientService.update(idCliente, client).subscribe({
      next: (updated) => {
        this.notificationService.setNotification('success', 'Cliente actualizado con exito');
        this.router.navigate(['clientes']);
      },
      error: (err) => this.notificationService.setNotification('error', 'Error al actualizar el cliente'),
    });
  }

}
