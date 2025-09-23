import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
