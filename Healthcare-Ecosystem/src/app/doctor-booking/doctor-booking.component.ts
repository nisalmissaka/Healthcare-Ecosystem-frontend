import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-booking',
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor-booking.component.html',
  styleUrl: './doctor-booking.component.css',
})
export class DoctorBookingComponent {
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedSlot: string | null = null;

  morningSlots: string[] =['09:00 AM','10.30 AM','11:30 AM'];
  eveningSlots: string[] =['04:00 PM','06:00'];

  selectSlot(slot: string){
    this.selectedSlot = slot;
  }
  onBookingSubmit(){
    if(this.selectedSlot){
      console.log('Booking Confiemed:',{
        date: this.selectedDate,
        time: this.selectedSlot
      });
      alert(`Booking Successful for ${this.selectedDate}at ${this.selectedSlot}`);
    }
  }

}
