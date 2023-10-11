import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catalog';

// onActivate(e){
//   console.log(e)
// }

// onDeactivate(e){
//   console.log(e)
// }

// constructor(private router: Router) {    // раскомментировать для трассировки
//   this.router.events.subscribe(
//     (event) => {
//       if (event instanceof NavigationStart){
//         console.log('navigation start')
//       }
//       if (event instanceof NavigationEnd){
//         console.log('navigation end')
//       }
//     }
//   )
// }

}
