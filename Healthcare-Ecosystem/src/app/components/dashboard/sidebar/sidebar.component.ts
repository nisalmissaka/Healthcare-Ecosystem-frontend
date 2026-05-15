import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  activeItem: string = 'dashboard';

  @Output() bookingClick = new EventEmitter<void>();
  @Output() doctorClick = new EventEmitter<void>();
  @Output() recordClick = new EventEmitter<void>();
  @Output() paymentClick = new EventEmitter<void>();

  setActive(item: string) {
    this.activeItem = item;
  }

  onDashboard() {
    this.setActive('dashboard');
  }

  onBooking() {
    this.setActive('booking');
    this.bookingClick.emit();
  }

  onDoctor() {
    this.setActive('doctor');
    this.doctorClick.emit();
  }

  onRecord() {
    this.setActive('record');
    this.recordClick.emit();
  }

  onPayment() {
    this.setActive('payment');
    this.paymentClick.emit();
  }
}