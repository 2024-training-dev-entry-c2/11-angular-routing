import { Component, inject } from "@angular/core";
import { FormComponent } from "../../../template/main/form/form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PostOrderService } from "../../../../services/order/post-order.service";
import { IOrderRequest } from "../../../../interfaces/order/order.request.interface";

@Component({
  selector: "app-register-order",
  imports: [FormComponent],
  templateUrl: "./register-order.component.html"
})
export class RegisterOrderComponent {
  formContent = {
    title: "Registrar pedido",
    fields: [
      {
        key: "date",
        label: "Fecha del pedido",
        placeholder: "Ingresa la fecha del pedido",
        type: "date",
        errorMessage: "No ha ingresado el dato",
      },
      {
        key: "clientId",
        label: "Id del Cliente",
        placeholder: "Ingresa el id del cliente",
        type: "number",
        errorMessage: "No ha ingresado el dato",
      },
    ],
    dynamicField: {
      key: "dishId",
      label: "Plato",
      placeholder: "Ingresa el id del plato",
      type: "number",
      errorMessage: "No ha ingresado el dato",
    },
  };

  router = inject(Router);
  route = inject(ActivatedRoute);
  postOrderService = inject(PostOrderService);

  createOrder(orderData: IOrderRequest): void {
    this.postOrderService.execute(orderData).subscribe(() => {
      this.router.navigate(["../"], { relativeTo: this.route });
    });
  }

  onSendForm(event: any) {
    const orderRequest: IOrderRequest = {
      clientId: 0,
      dishes: [],
      date: new Date(),
    };
    orderRequest.clientId = event.clientId;
    orderRequest.date = event.date;
    orderRequest.dishes = event.dishes;
    this.createOrder(orderRequest);
  }
}
