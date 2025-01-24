import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Client, newClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client/client.service';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-cliente-modal',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.scss',
})
export class ClienteModalComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.getData);
    this.setValue();
  }
  clientData: Client | any;
  public clients = inject(ClientService);
  private formUpdateBuilder = inject(FormBuilder);
  showModal = false;
  @Input() getData: any = [];
  @Input() showModalClient!: boolean;
  @Input() getClientId: number = 0;
  @Output() closeModalclient = new EventEmitter<void>();

  public clientUpdatedForm = this.formUpdateBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.minLength(2), Validators.required]],
    isOften: [false],
    orderIds: this.formUpdateBuilder.array([]),
  });

  setValue(): void {
    const orderIdsArray = this.clientUpdatedForm.get('orderIds') as FormArray;
    orderIdsArray.clear();
    if (this.getData.orderIds && Array.isArray(this.getData.orderIds)) {
      this.getData.orderIds.forEach((orderId: number) => {
        orderIdsArray.push(
          this.formUpdateBuilder.control(orderId, Validators.required)
        );
      });
    }
    console.log(this.getData);
    this.clientUpdatedForm.patchValue({
      id: this.getData.id,
      email: this.getData.email,
      name: this.getData.name,
      isOften: this.getData.isOften,
    });
    orderIdsArray.disable();
    this.showModal = true;
  }

  updateClient(): void {
    if (this.clientUpdatedForm.valid) {
      const updatePayload = {
        name: this.clientUpdatedForm.get('name')?.value,
        email: this.clientUpdatedForm.get('email')?.value,
        isOften: this.clientUpdatedForm.get('isOften')?.value,
      };
      this.clients
        .updateClient(updatePayload as unknown as newClient, this.getClientId)
        .subscribe({
          next: (data) => {
            console.log(data);
            alert('Client updated successfully');
          },
          error: (error) => {
            console.log(error);
          },
        });
      console.log(this.clientUpdatedForm.value);
    } else {
      console.log(this.clientUpdatedForm);
    }
  }

  closeModal() {
    this.closeModalclient.emit();
  }
}
