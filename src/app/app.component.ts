import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {   
  title = 'project_CRUD';
}
