import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerPageComponent } from '../../components/templates/customer-page/customer-page.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CustomersRoutingModule, CustomerPageComponent],
})
export class CustomersModule {}
