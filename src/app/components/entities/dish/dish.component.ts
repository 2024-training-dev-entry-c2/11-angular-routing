import { Component, inject } from '@angular/core';
import { GetDishesService } from '../../../services/dish/get-dishes.service';
import { PostDishService } from '../../../services/dish/post-dish.service';
import { PutDishService } from '../../../services/dish/put-dish.service';
import { DeleteDishService } from '../../../services/dish/delete-dish.service';
import { IDishResponse } from '../../../interfaces/dish/dish.response.interface';
import { ContainerComponent } from '../../template/main/container/container.component';
import { BoardComponent } from '../../template/main/board/board.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dish',
  imports: [ContainerComponent, BoardComponent, RouterOutlet, RouterLink],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent {
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };
  idToUpdate: string | null = null;

  getDishesService = inject(GetDishesService);
  deleteDishService = inject(DeleteDishService);

  router = inject(Router);
  route = inject(ActivatedRoute);

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
    const titles = ['#', 'Plato', 'Descripción', 'Precio', 'Estado', 'MenuId'];
    const content = dishes.map(dish =>[
      dish.id.toString(),
      dish.name,
      dish.description,
      dish.price.toString(),
      dish.state,
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
