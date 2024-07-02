import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formatted-button',
  standalone: true,
  imports: [],
  templateUrl: './formatted-button.component.html',
  styleUrl: './formatted-button.component.css'
})
export class FormattedButtonComponent {
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if(!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
