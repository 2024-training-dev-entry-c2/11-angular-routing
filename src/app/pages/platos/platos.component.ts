import { Component, inject, OnInit } from '@angular/core';
import { PlatosService } from '../../services/platos.service';
import { IPlato } from '../../interfaces/plato.interface';
import { PlatoCardComponent } from '../../components/card/plato-card/plato-card.component';
import { FormPlatosComponent } from '../../components/forms/form-platos/form-platos.component';

@Component({
  selector: 'app-platos',
  imports: [PlatoCardComponent, FormPlatosComponent],
  templateUrl: './platos.component.html',
  styleUrl: './platos.component.scss',
})
export class PlatosComponent {
  private platoService = inject(PlatosService);
  public platoSelected = {
    id: -1,
    nombre: '',
    precio: 0,
    urlImage: '',
    tipoPlato: '',
    idmenu: -1,
  };
  platos: any = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.resetSelected();
    this.platoService.getAll().subscribe((res) => (this.platos = res));
  }

  addOrUpdate(plato: IPlato) {
    if (
      this.platoSelected.id == -1 &&
      this.platoSelected.nombre == '' &&
      this.platoSelected.precio == 0 &&
      this.platoSelected.tipoPlato == '' &&
      this.platoSelected.idmenu == -1
    ) {
      this.add(plato);
    } else {
      this.update(plato);
    }
  }

  add(plato: IPlato) {
    this.platoService.post(plato).subscribe((_) => this.getAll());
  }

  update(plato: IPlato) {
    this.platoService.update(plato).subscribe((_) => this.getAll());
  }

  delete(id: number) {
    this.platoService.deleteById(id).subscribe((_) => this.getAll());
    console.log(id + ' delete menu');
  }

  selectToUpdate(plato: any) {
    this.platoSelected = plato;
  }

  resetSelected(): void {
    this.platoSelected = {
      id: -1,
      nombre: '',
      precio: 0,
      urlImage: '',
      tipoPlato: '',
      idmenu: -1,
    };
  }
}
