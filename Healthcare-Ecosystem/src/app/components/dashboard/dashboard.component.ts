import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { DashboardService } from './../../services/dashboard.service';
import { SidebarComponent } from './sidebar/sidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, BaseChartDirective, SidebarComponent], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any;
  isDataLoaded = false;
  isBookingMenuOpen: boolean = false;
  selectedBooking: string = '';

  onBookingClick(): void {
    this.isBookingMenuOpen = !this.isBookingMenuOpen;
    console.log('Booking menu status:', this.isBookingMenuOpen);
  }

  // Chart configurations...
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [],
      label: 'Activity',
      borderColor: '#36A2EB',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe({
      next: (data: any) => {
        this.stats = data; 
        if (data && data.activityData) {
          this.lineChartData = {
            ...this.lineChartData,
            datasets: [{ ...this.lineChartData.datasets[0], data: data.activityData }]
          };
          this.isDataLoaded = true;
        }
      },
      error: (err: any) => console.error('API Error:', err)
    });
  }
}