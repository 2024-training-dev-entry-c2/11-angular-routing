import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../inferfaces/view-orden.interface';

@Component({
  selector: 'app-add-client',
  imports: [ReactiveFormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  private clientService = inject(ClientService)
  private formBuilder = inject(FormBuilder);
  mensajeExito: string | null = null;
  @Input() clientSelect: IClient | null = null;
  isEditMode: boolean = false;

   public clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numberPhone: ['', [Validators.required]],
    });

     ngOnChanges(changes: SimpleChanges) {
        if (changes['clientSelect'] && this.clientSelect) {
          this.isEditMode = true;

          this.clientForm.setValue({
            name: this.clientSelect.name,
            email: this.clientSelect.email,
            numberPhone: this.clientSelect.numberPhone,
          });
        }else {
      this.isEditMode = false;
    }
      }

onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData: IClient = this.clientForm.getRawValue() as IClient;
      console.log("cliente :", JSON.stringify(clientData, null, 2));
      if (this.clientSelect) {
        console.log(this.clientSelect.id)
        clientData.id = this.clientSelect.id;
        this.clientService.updateClient(clientData).subscribe({
          next: () => {
            this.mensajeExito = '¡Cliente actualizado con éxito!';
            this.clientForm.reset();
            setTimeout(() => {
              this.mensajeExito = null;
            }, 3000);
          },
        });
      } else {
        this.clientService.createClient(clientData).subscribe({
          next: () => {
            this.mensajeExito = '¡Cliente creado con éxito!';
            this.clientForm.reset();
            setTimeout(() => {
              this.mensajeExito = null;
            }, 3000);
          },
          error: (error) => {
            console.error('Error al crear el cliente', error);
          }
        });
      }
  }
}
}
