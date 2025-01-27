import { Component, computed, inject } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { AccountComponent } from '../../features/dashboard/components/account/account.component';
import { TransactionComponent } from '../../features/dashboard/components/transaction/transaction.component';
import { UserComponent } from '../../features/dashboard/components/user/user.component';

@Component({
  selector: 'app-dash-layout',
  imports: [
    UserComponent,
    AccountComponent,
    TransactionComponent
  ],
  templateUrl: './dash-layout.component.html',
  styleUrl: './dash-layout.component.scss'
})
export class DashLayoutComponent {
  private menuService = inject(MenuService);
  currentMenu = computed(() => this.menuService.selectedMenu());
  

}
