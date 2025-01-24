import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { GetClientService } from '../../../services/client/get-client.service';
import { TableComponent } from '../../../components/table/table.component';
import { FormField } from '../../../interfaces/form.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../components/form/form.component';

@Component({
  selector: 'app-clients',
  imports: [TabsComponent, TableComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  listClients: any[] = [];
  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];

  public clients = inject(GetClientService);

  ngOnInit(): void {
    this.clients.getClients().subscribe({
      next: (data) => {
        this.listClients = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public fields: FormField[] = [
    { label: 'Email', type: 'email', name: 'email', validators: [Validators.required, Validators.email] },
    { label: 'Name Client', type: 'password', name: 'password', validators: [Validators.required, Validators.minLength(8)] }
  ];
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    address: this.formBuilder.group({
      street: [''],
      number: [''],
      zipCode: ['']
    }),
    tags: this.formBuilder.array([]),
  });

  submit() {
    if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    }
    console.log("something");
    
    console.log(this.loginForm);
  }

  // deleteClient(id: number): void {
  //   this.clients.deleteClient(id).subscribe({
  //     next: (data) => {
  //       this.listClients = data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
