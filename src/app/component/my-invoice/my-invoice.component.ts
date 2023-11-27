import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InvoiceServiceService } from 'src/app/service/invoice-service.service';





@Component({
  selector: 'app-my-invoice',
  templateUrl: './my-invoice.component.html',
  styleUrls: ['./my-invoice.component.css']
})
export class MyInvoiceComponent implements OnInit {


  ngOnInit(): void {

  }



  company = {
    gst: '09DULPS6670G2ZV',
    invoice_type: 'TAX INVOICE',
    company_name: 'KUNDER & COMPANY',
    mobile: '9198152715',
    address: '481/B Chack Dondi, Naini, Prayagraj U. P. India- 211008',
    deals_in: 'All Type Of Mills, Machinary & Spare Parts',
    department: 'Sales & Service',
    state_code: '09'
  };


  bank_data: any = {
    bank_name: 'Yes Bank',
    ifsc_code: 'YESB0001119',
    bank_ac: '111963400000532',
    upi_id: '7390016161922@paytm'
  }

  ac_date = new Date();

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  date = new Intl.DateTimeFormat('en-US', this.options).format(this.ac_date);
  invoice_number = Math.floor(100000 + Math.random() * 900000);

  customer_submit_status: boolean = false;
  gstRates: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  gst_rate: any = 0;

  customer = {
    mobileNumber: '',
    customerName: '',
    address: '',
    gst: '',
    state: '',
    stateCode: '',
    placeOfSupply: ''
  };




  addCustomerDetails() {
    if (!this.customer.address || !this.customer.customerName || !this.customer.mobileNumber || !this.customer.placeOfSupply) alert('please filled required data.')
    else {
      const formDataJson = JSON.stringify(this.customer);
      this.customer_submit_status = true;
    }
  }


  cart: any[] = [];
  newProduct: any = {};
  editingIndex: number | null = null;
  genrate_status: boolean = false;

  amount_calcu = {
    total_amount: 0,
    total_gst_amount: 0,
    total_amount_with_text: 0
  };

  calculate_price() {
    let total_amount = 0;

    this.cart.forEach((crt) => total_amount += +crt.totalAmount);

    let total_gst_amount = (total_amount * (+this.gst_rate)) / 100;
    let total_amount_with_text = total_amount + total_gst_amount;

    this.amount_calcu = {
      total_amount,
      total_gst_amount,
      total_amount_with_text
    }

  }


  addProduct() {
    if (!this.newProduct.productName || !this.newProduct.hsnCode || !this.newProduct.qty || !this.newProduct.rate) alert('please filled all product data')
    else {
      if (this.editingIndex !== null) {
        this.newProduct['totalAmount'] = this.newProduct.rate * this.newProduct.qty
        this.cart[this.editingIndex] = { ...this.newProduct };
        this.editingIndex = null;
      } else {
        console.log(this.newProduct)
        this.newProduct['totalAmount'] = this.newProduct.rate * this.newProduct.qty

        this.cart.push({ ...this.newProduct });
      }

      this.resetForm();
    }

  }

  editProduct(index: number) {
    this.newProduct = { ...this.cart[index] };
    this.editingIndex = index;
  }

  removeProduct(index: number) {
    this.cart.splice(index, 1);
  }

  addNewProduct() {
    this.resetForm();
    this.editingIndex = null;
  }

  resetForm() {
    this.newProduct = {};
  }



  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2,private pdfGeneratorService: InvoiceServiceService) { }
  @ViewChild('invoiceContainer') invoiceContainer!: ElementRef;

  getFormattedDate(): string {
    const currentDate = new Date();
    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  }

  // Generate a safe HTML string for rendering
  generateSafeHtml(): SafeHtml {
    const invoiceContent = this.invoiceContainer.nativeElement.innerHTML;
    return this.sanitizer.bypassSecurityTrustHtml(invoiceContent);
  }

  // Print the invoice
  printInvoice(): void {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Format the date as a string

    const fileName = `Invoice_${formattedDate}`;
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.write(`<html><head>

    <style>


    .main-pdf{
      border: 2px solid rgb(199, 110, 110);

    }

    .company_name {

      font-size: 75px;
    }

    .address{
      font-size: 21px;
      text-decoration: underline;
    }

    .deals{
      font-size: 20px;
      text-decoration: underline;
    }

    .department{
      font-size: 20px;
      font-weight: bold;
    }

    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    .customer_details{
      /* border: 1px solid black; */
      padding: 10px;
      /* background-color: antiquewhite; */
    }


    .no_border{
      border: 1px solid white;
    }

    .decoration{
      text-decoration: dotted,underline;
    }

    .company_details{
      background-color: rgb(211, 204, 204);
    }


    .condition{
      font-size: 12px;
      font-weight: bold;
    }

    .border-customer{
      border: 1px solid black;
    }

    .border-price{
      border: 1px solid black;

    }

    </style>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"></script>

    <title>Print</title></head><body>`);
      printWindow.document.write(this.invoiceContainer.nativeElement.innerHTML);

      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('something is worng..')
    }

  }

  // Download the invoice as a PDF
  downloadInvoice1(): void {



    const pdfWindow = window.open();

    if (pdfWindow) {
      pdfWindow.document.write(`<html><head>
      <style>


.main-pdf{
  border: 1px solid rgb(199, 110, 110);
  /* padding: 5px; */
}

.company_name {

  font-size: 75px;
}

.address{
  font-size: 21px;
  text-decoration: underline;
}

.deals{
  font-size: 20px;
  text-decoration: underline;
}

.department{
  font-size: 20px;
  font-weight: bold;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

.customer_details{
  /* border: 1px solid black; */
  padding: 10px;
  /* background-color: antiquewhite; */
}


.no_border{
  border: 1px solid white;
}

.decoration{
  text-decoration: dotted,underline;
}

.company_details{
  background-color: rgb(211, 204, 204);
}


.condition{
  font-size: 12px;
  font-weight: bold;
}


.border-customer{
  border: 1px solid black;
}

.border-price{
  border: 1px solid black;

}
      </style>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>

      <title>Download</title></head><body>`);
      // console.log(this.invoiceContainer.nativeElement.innerHTML)
      pdfWindow.document.write(this.invoiceContainer.nativeElement.innerHTML);
      pdfWindow.document.write(`</body></html>`);
      pdfWindow.document.close();
      const pdfData = 'data:application/pdf;base64,' + btoa(pdfWindow.document.documentElement.outerHTML);
      const downloadLink = this.renderer.createElement('a');
      this.renderer.setAttribute(downloadLink, 'href', pdfData);
      this.renderer.setAttribute(downloadLink, 'download', 'invoice.pdf');
      this.renderer.appendChild(document.body, downloadLink);
      console.log(document.body)
      downloadLink.click();

      setTimeout(() => {
        this.renderer.removeChild(document.body, downloadLink);
      }, 1000);

    }
    else {
      alert('something is worng..')
    }

  }

  downloadInvoice(): void {

  const htmlData  = `<html><head>
      <style>


.main-pdf{
  border: 1px solid rgb(199, 110, 110);
  margin: 5px;
}

.company_name {

  font-size: 75px;
}

.address{
  font-size: 21px;
  text-decoration: underline;
}

.deals{
  font-size: 20px;
  text-decoration: underline;
}

.department{
  font-size: 20px;
  font-weight: bold;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

.customer_details{
  /* border: 1px solid black; */
  padding: 10px;
  /* background-color: antiquewhite; */
}


.no_border{
  border: 1px solid white;
}

.decoration{
  text-decoration: dotted,underline;
}

.company_details{
  background-color: rgb(211, 204, 204);
}


.condition{
  font-size: 12px;
  font-weight: bold;
}


.border-customer{
  border: 1px solid black;

}

.border-price{
  border: 1px solid black;
}
      </style>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>

      <title>Download</title></head><body>


      <div>${this.invoiceContainer.nativeElement.innerHTML}</div>

      </body></html>

      `

      ;

      const filename = `${this.customer.customerName} ${new Date().getUTCDate()}`


    this.pdfGeneratorService.generatePdfFromHtml(htmlData,filename);
  }


}
