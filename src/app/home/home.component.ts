import { CommonModule } from '@angular/common';
import {  Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showdata: { name: string, mark: boolean }[] = [];
  cart: any[] = [];


  constructor() {
    let short = JSON.parse(localStorage.getItem('cart') || '[]');

    this.showdata = short.map((list: string) => ({
      name: list,
      mark: false, 
    }));
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('cart');
    if (storedData) {
      this.showdata = JSON.parse(storedData);}
  }
  

  data = new FormGroup({
    show: new FormControl(null, [Validators.minLength(3) , Validators.required]),
  });

 

  



  submit(data: any): void {
    let showdata = this.data.value.show;

    if (showdata) {
      this.showdata.push({ name: showdata, mark: false }); 
      localStorage.setItem('cart', JSON.stringify(this.showdata));
    } else {
      alert('Please Enter Tasks');
      
    }
  }

  memorydata(show: any): void {
    console.log(show);
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } else {
      console.log('No data in cart');
    }
    this.cart.push(show);
    localStorage.setItem('cart', JSON.stringify(this.cart));
   
  }

  delet(index: number): void {
    console.log(index);
    this.showdata.splice(index, 1);
    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(this.showdata));
    }, 100);
  }

  trackByFn(index: number ): any {
    return index;
  }



  
 
  


}
