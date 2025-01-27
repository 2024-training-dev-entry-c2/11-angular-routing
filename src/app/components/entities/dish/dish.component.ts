import { Component, inject } from '@angular/core';
import { GetDishesService } from '../../../services/dish/get-dishes.service';
import { DeleteDishService } from '../../../services/dish/delete-dish.service';
import { IDishResponse } from '../../../interfaces/dish/dish.response.interface';
import { ContainerComponent } from '../../template/main/container/container.component';
import { BoardComponent } from '../../template/main/board/board.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { OptionsComponent } from '../../template/main/options/options.component';
import { CurrencyPipe, TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-dish',
  imports: [ContainerComponent, BoardComponent, OptionsComponent, RouterOutlet],
  providers:[TitleCasePipe, CurrencyPipe],
  templateUrl: './dish.component.html'
})
export class DishComponent {
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };
  idToUpdate: string | null = null;

  getDishesService = inject(GetDishesService);
  deleteDishService = inject(DeleteDishService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  titlePipe = inject(TitleCasePipe);
  currencyPipe = inject(CurrencyPipe);

  ngOnInit(){
    this.getData();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.getData();
      });
  }

  getData(): void{
    this.getDishesService.execute().subscribe((menus: IDishResponse[])=>{
      this.transformMenuResponse(menus);
    })
  }

  private transformMenuResponse(dishes: IDishResponse[]): void {
    const titles = ['#', 'Plato', 'Descripción', 'Precio', 'Tipo Plato', 'MenuId'];
    const content = dishes.map(dish =>[
      dish.id.toString(),
      this.titlePipe.transform(dish.name),
      dish.description,
      (this.currencyPipe.transform(dish.price, 'COP', 'symbol')??'').toString(),
      this.titlePipe.transform(dish.state),
      dish.menuId.toString()
    ]);

    this.tableContent={titles, content};
  }

  deleteMenu(id:string): void {
    console.log("Entro");
    this.deleteDishService.execute(id).subscribe(()=>{
      console.log("Eliminado");
      this.getData();
    }     
    );
  }
}
