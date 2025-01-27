import { Component, inject } from '@angular/core';
import { IMenuResponse } from '../../../interfaces/menu/menu.response.interface';
import { GetMenusService } from '../../../services/menu/get-menus.service';
import { ContainerComponent } from "../../template/main/container/container.component";
import { BoardComponent } from '../../template/main/board/board.component';
import { DeleteMenuService } from '../../../services/menu/delete-menu.service';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { OptionsComponent } from '../../template/main/options/options.component';

@Component({
  selector: 'app-menu',
  imports: [ ContainerComponent, BoardComponent, OptionsComponent, RouterOutlet ],
  providers:[TitleCasePipe],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };

  getMenusService = inject(GetMenusService);
  deleteMenuService = inject(DeleteMenuService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  titlePipe = inject(TitleCasePipe);  


  ngOnInit(){
    this.getData();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd ))
      .subscribe(async() => {
        await this.getData();
    });
  }

  getData(): void{
    this.getMenusService.execute().subscribe((menus: IMenuResponse[])=>{
      this.transformMenuResponse(menus);
    })
  }

  private transformMenuResponse(menus: IMenuResponse[]): void {
    const titles = ['#', 'Menú', 'Platos'];
    const content = menus.map(menu =>[
      menu.id.toString(),
      this.titlePipe.transform(menu.name),
      menu.dishes.map(dish => `• ${this.titlePipe.transform(dish.name)}`).join('<br>')
    ]);

    this.tableContent={titles, content};
  }

  deleteMenu(id:string): void {
    console.log("Entro");
    this.deleteMenuService.execute(id).subscribe(()=>{
      console.log("Eliminado");
      this.getData();
    }     
    );
  }
}
