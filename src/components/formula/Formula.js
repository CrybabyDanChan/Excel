import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['click'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <input class="input" />
    `;
  }

  onClick(event) {
    console.log(this);
  }
}
