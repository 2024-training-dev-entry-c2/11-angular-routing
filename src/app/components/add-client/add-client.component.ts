import { Component, inject } from '@angular/core';
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

   public clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numberPhone: ['', [Validators.required]],
      isFrecuent: [false],
    });

    onSubmit(): void {
      if (this.clientForm.valid) {
          const clientData: IClient = this.clientForm.getRawValue() as IClient;
          console.log("orden:", JSON.stringify(clientData, null, 2));
          this.clientService.createClient(clientData).subscribe({
            next: () => {
              this.mensajeExito = '¡Cliente creado con éxito!';
              this.clientForm.reset();
              setTimeout(() => {
                this.mensajeExito = null;
              }, 3000);
            },
          });
    }

}
}
