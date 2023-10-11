import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  openRoute(route: string): void { // роут для кнопки Избранное
    this.router.navigate(['/', route]) // роут для кнопки Избранное
  }

  constructor(private router: Router) { } // роут для кнопки Избранное

  ngOnInit(): void {
  }

}
