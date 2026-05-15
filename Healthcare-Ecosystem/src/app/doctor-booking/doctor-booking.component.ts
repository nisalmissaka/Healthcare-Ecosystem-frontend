import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-doctor-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.css']
})
export class DoctorBookingComponent {

  @Input() doctors: any[] = [];

  selectedDate: string =
    new Date().toISOString().split('T')[0];

  selectedSlot: string | null = null;

  morningSlots: string[] = [
    '09:00 AM',
    '10:30 AM',
    '11:30 AM'
  ];

  eveningSlots: string[] = [
    '04:00 PM',
    '06:00 PM'
  ];

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }

  onBookingSubmit() {

    if (this.selectedSlot) {

      console.log('Booking Confirmed:', {
        date: this.selectedDate,
        time: this.selectedSlot
      });

      alert(
        `Booking Successful for ${this.selectedDate} at ${this.selectedSlot}`
      );
    }
  }
}