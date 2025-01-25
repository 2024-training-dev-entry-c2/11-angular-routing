import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-delete',
  imports: [],
  template: '',
  styles: ''
})
export class DeleteComponent implements OnInit {
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  public idCliente: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idCliente = +idParam;
      }
      this.deleteClient(this.idCliente);
    });
  }

  private deleteClient(id: number): void {
    this.clientService.delete(id).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Cliente eliminado exitosamente.');
        this.router.navigate(['clientes']);
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
        this.notificationService.setNotification('error', 'Error al eliminar el cliente.');
      }
    });
  }

}
