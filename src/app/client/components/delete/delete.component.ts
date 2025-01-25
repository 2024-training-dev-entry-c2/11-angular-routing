import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute,Router } from '@angular/router';

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
      next: (response) => {
        console.log("CLIENTE ELIMINADO", response);
        this.router.navigate(['clientes']);
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
      }
    });
  }

}
