import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent implements AfterViewInit{
  @ViewChild('bgMusic') bgMusicRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('speakerBtn') speakerBtnRef!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeIcon') volumeIconRef!: ElementRef<HTMLElement>;

  private router = inject(Router)

  isMusicPlaying = false;

  ngAfterViewInit(): void {
    const speakerBtn = this.speakerBtnRef.nativeElement;

    // Random position on load
    const maxX = window.innerWidth - speakerBtn.offsetWidth;
    const maxY = window.innerHeight - speakerBtn.offsetHeight;

    const startX = Math.random() * maxX;
    const startY = Math.random() * maxY;

    speakerBtn.style.left = `${startX}px`;
    speakerBtn.style.top = `${startY}px`;

    // Toggle mute on click
    speakerBtn.addEventListener('click', () => this.toggleMute());

    // Move on hover
    speakerBtn.addEventListener('mouseover', () => {
      const maxX = window.innerWidth - speakerBtn.offsetWidth;
      const maxY = window.innerHeight - speakerBtn.offsetHeight;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      speakerBtn.style.left = `${newX}px`;
      speakerBtn.style.top = `${newY}px`;
    });

    // Try to auto-play on first user click
    document.addEventListener(
      'click',
      () => {
        if (!this.isMusicPlaying) {
          const audio = this.bgMusicRef.nativeElement;
          audio.volume = 0.3;
          audio
            .play()
            .then(() => {
              this.isMusicPlaying = true;
              this.volumeIconRef.nativeElement.className = 'fas fa-volume-up';
            })
            .catch((err) => {
              console.warn('Autoplay failed:', err);
            });
        }
      },
      { once: true }
    );
  }

  toggleMute(): void {
    const audio = this.bgMusicRef.nativeElement;
    const icon = this.volumeIconRef.nativeElement;

    audio.muted = !audio.muted;
    icon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  }

  changeLanguage(lang: 'fr' | 'dog' | 'cat') {
    document.querySelectorAll('.fr, .dog, .cat').forEach((el) => {
      el.classList.add('hidden');
    });

    document.querySelectorAll('.' + lang).forEach((el) => {
      el.classList.remove('hidden');
    });

    if (lang === 'dog') {
      new Audio('https://www.soundjay.com/mechanical/sounds/dog-bark-01.mp3').play();
    } else if (lang === 'cat') {
      new Audio('https://www.soundjay.com/mechanical/sounds/cat-meow-1.mp3').play();
    }
  }
  gotoTool(url:string){
    this.router.navigateByUrl(url)
  }
}
