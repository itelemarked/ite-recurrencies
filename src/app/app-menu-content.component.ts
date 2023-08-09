import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-content',
  standalone: true,
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>AppMenuContentComponent works!</h3>
  `,
  styles: [``]
})
export class AppMenuContentComponent {}
