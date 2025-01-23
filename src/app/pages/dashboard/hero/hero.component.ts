import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SalesCardComponent } from '../../../components/sales-card/sales-card.component';
declare const Swiper: any;
@Component({
  selector: 'app-hero',
  imports: [SalesCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit{
  cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6', 'Card 7', 'Card 8'];
  currentPosition = 0;
  cardWidth = 0;
  visibleCards = 3;

  ngAfterViewInit() {
    this.updateCardWidth();
  }

  @HostListener('window:resize')
  updateCardWidth() {
    const cardElement = document.querySelector('.card') as HTMLElement;
    if (cardElement) {
      this.cardWidth = cardElement.offsetWidth +16; // Ancho de la tarjeta + margen
      this.correctPosition();
    }
  }

  // Corrige la posición actual para evitar desplazamientos incorrectos al redimensionar
  correctPosition() {
    const maxPosition = -(this.cards.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition < maxPosition) {
      this.currentPosition = maxPosition;
    } else if (this.currentPosition > 0) {
      this.currentPosition = 0;
    }
  }

  nextSlide() {
    const maxPosition = -(this.cards.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition > maxPosition) {
      this.currentPosition -= this.cardWidth;
    }
  }

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.cardWidth;
    }
  }
}
