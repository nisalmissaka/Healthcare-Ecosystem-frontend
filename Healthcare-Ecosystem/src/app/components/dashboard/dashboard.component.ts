import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardService } from './../../services/dashboard.service';
import { DoctorBookingComponent } from '../../doctor-booking/doctor-booking.component';
import { SidebarComponent } from './sidebar/sidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    DoctorBookingComponent,
    SidebarComponent,
    RouterLink,
    RouterOutlet
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeButton: string = 'Dashboard';

  setActive(buttonName: string){
    this.activeButton = buttonName;
  }

  stats: any;
  isDataLoaded = false;

  isBookingMenuOpen: boolean = false;
  selectedBooking: string = '';

  doctors: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  onBookingClick(): void {
    this.isBookingMenuOpen = !this.isBookingMenuOpen;

    console.log(
      'Booking menu status:',
      this.isBookingMenuOpen
    );
  }

  onDoctorClick(): void {
    this.selectedBooking = 'doctor-list';

    console.log('Doctor section clicked');
  }
onRecodClick() {
  this.selectedBooking = 'record';
  console.log("Record section clicked");
}

onPaymentClick() {
  this.selectedBooking = 'payment';
  console.log("Payment section clicked");
}

  emitBookingEvent(): void {
    this.onBookingClick();
  }

  emitDoctorEvent(): void {
    this.onDoctorClick();
  }

  emitRecodEvent(): void {
    this.onRecodClick();
  }

  emitPaymentEvent(): void {
    this.onPaymentClick();
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ],

    datasets: [
      {
        data: [],
        label: 'Activity',
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSummary();
  }

  loadDoctors(): void {

    this.dashboardService.getDoctors().subscribe({

      next: (data) => {

        this.doctors = data;

        console.log(
          'Doctors loaded:',
          this.doctors
        );
      },

      error: (err) =>
        console.error(
          'Error loading doctors',
          err
        )
    });
  }

  loadSummary(): void {

    this.dashboardService.getSummary().subscribe({

      next: (data: any) => {

        this.stats = data;

        if (data && data.activityData) {

          this.lineChartData = {

            ...this.lineChartData,

            datasets: [
              {
                ...this.lineChartData.datasets[0],
                data: data.activityData
              }
            ]
          };

          this.isDataLoaded = true;
        }
      },

      error: (err: any) =>
        console.error(
          'API Error(Summary):',
          err
        )
    });
  }
}