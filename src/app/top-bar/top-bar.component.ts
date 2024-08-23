import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  openRoute(route: string): void {
    this.router.navigate(['/', route])
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
