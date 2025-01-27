import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditClientService } from '../../../../services/client/edit-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddClientService } from '../../../../services/client/add-client.service';
import { DynamicInputComponent } from '../../../custom/dynamic-input/dynamuc-input.component';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule, CommonModule, DynamicInputComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
    clientForm: FormGroup;
    private editClientService = inject(EditClientService);
    private addClientService = inject(AddClientService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    protected clientId: number | null = null
    isLoading = true;

    constructor(private fb: FormBuilder) {
        this.clientForm = this.fb.group({
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
        });
      }

      ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
          const id = params.get('id');
          if (id) {
            this.clientId = + id;
            this.clientData(this.clientId);
          } else {
            this.isLoading = false;
          }
        });
      }

    clientData(id: number): void {
      this.editClientService.getClient(id).subscribe({
        next: (client) => {
          this.clientForm.patchValue(client); 
          this.isLoading = false; 
        },
        error: (err) => {
          console.error('Error al cargar los datos del cliente:', err);
          this.isLoading = false; 
        },
      });
    }

    submit(): void {
      if (this.clientForm.valid) {
          const clientData = this.clientForm.value;

          if (this.clientId) {
              // Actualizar cliente existente
              this.editClientService.updateClient(this.clientId, clientData).subscribe({
                  next: () => {
                      this.router.navigate(['/client']);
                  },
                  error: (err) => {
                      console.error('Error al actualizar el cliente:', err);
                  },
              });
          } else {
              // Agregar nuevo cliente
              this.addClientService.execute(clientData).subscribe({
                  next: () => {
                      this.router.navigate(['/client']);
                  },
                  error: (err) => {
                      console.error('Error al agregar el cliente:', err);
                  },
              });
          }
      } else {
          console.error('Formulario inválido');
      }
  }
}
