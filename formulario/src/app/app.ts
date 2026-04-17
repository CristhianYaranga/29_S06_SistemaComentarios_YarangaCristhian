import { Component } from '@angular/core';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
