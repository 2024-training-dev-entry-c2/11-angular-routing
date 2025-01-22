import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  navItems = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', active: true },
    { label: 'Clients', icon: 'far fa-address-book', active: false },
    { label: 'Menus', icon: 'far fa-clone', active: false },
    { label: 'Orders', icon: 'far fa-calendar-alt', active: false },
    { label: "/ᐠ - ˕ -マ", icon: 'far fa-calendar-alt', active: false },

  ];

  ngOnInit(): void {
    setTimeout(() => this.updateHoriSelector(), 0);
    setTimeout(() => this.setActiveOnPath(), 0);
    this.updateHoriSelector();
    this.setActiveOnPath();
  }

  onNavItemClick(item: any): void {
    this.navItems.forEach((nav) => (nav.active = false));
    item.active = true;
    this.updateHoriSelector();
    setTimeout(() => this.updateHoriSelector(), 0);
  }

  updateHoriSelector(): void {
    const tabs = document.getElementById('navbarSupportedContent');
    const activeItem = tabs?.querySelector('.active') as HTMLElement;
    const horiSelector = document.querySelector('.hori-selector') as HTMLElement;

    if (activeItem && horiSelector) {
      const { offsetHeight: height, offsetWidth: width, offsetTop: top, offsetLeft: left } = activeItem;

      horiSelector.style.top = `${top}px`;
      horiSelector.style.left = `${left}px`;
      horiSelector.style.height = `${height}px`;
      horiSelector.style.width = `${width}px`;
      setTimeout(() => this.updateHoriSelector(), 0);
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    setTimeout(() => this.updateHoriSelector(), 200);
  }

  setActiveOnPath(): void {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const targetItem = this.navItems.find((item) => item.label.toLowerCase() === path.split('.')[0]);
    if (targetItem) {
      this.onNavItemClick(targetItem);
    }
  }
}
