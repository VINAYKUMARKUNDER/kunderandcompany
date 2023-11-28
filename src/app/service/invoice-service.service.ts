import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js'

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  constructor() { }

  generatePdfFromHtml(htmlContent: string, filename:any): void {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    html2pdf(element,{
      filename: filename,
    });
  }
}
