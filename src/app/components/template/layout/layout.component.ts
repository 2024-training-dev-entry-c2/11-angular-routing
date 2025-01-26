import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { UpperCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "../main/container/container.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private upperCase = new UpperCasePipe();

  items = [
    {url: 'pedidos', text: 'Pedidos'},
    {url: 'clientes', text: 'Clientes'},
    {url: 'menus', text: 'Menús'},
    {url: 'platos', text: 'Platos'}
  ];
  user = 'admin';

  ngOnInit(){
    this.items.forEach(item => {
      item.text = this.upperCase.transform(item.text);
    });

    this.user =this.upperCase.transform(this.user);
  }
}
