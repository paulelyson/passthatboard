import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class ImageExportService {
  downloadImage(element: HTMLElement, filename: string) {
    html2canvas(element, {
      useCORS: true,
      scale: window.devicePixelRatio,
      backgroundColor: null,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}
