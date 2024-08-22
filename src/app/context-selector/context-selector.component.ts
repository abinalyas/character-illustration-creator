import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-selector',
  templateUrl: './context-selector.component.html',
  styleUrls: ['./context-selector.component.css']
})
export class ContextSelectorComponent {
  contexts = ['work', 'leisure', 'study', 'exercise'];
  context = 'work';
  
  @Output() contextChange = new EventEmitter<string>();

  onContextChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.contextChange.emit(value);
  }
}
