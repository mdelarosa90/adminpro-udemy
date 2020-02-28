import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {
    // let elemHTML: any = document.getElementsByName('porcentaje')[0];
    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(num: number) {
    if (this.porcentaje >= 100 && num > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && num < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + num;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

}
