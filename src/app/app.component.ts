import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ obligatoire si tu utilises inject()
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ corriger ici aussi
})
export class AppComponent {
  title = 'GwaikM-dev';

  private router = inject(Router); // ✅ inject() au lieu de Inject()

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.router.navigateByUrl('');
  }
}
