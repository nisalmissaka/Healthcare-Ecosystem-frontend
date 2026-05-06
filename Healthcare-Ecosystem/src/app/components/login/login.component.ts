import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';        
import { CommonModule } from '@angular/common';      
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,   
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj = {
    username: '',
    email: ''
  };

  constructor(private http: HttpClient, private router:Router) {}

  onLogin() {
    this.http.post('http://localhost:8080/api/auth/login', this.loginObj)
      .subscribe({
        next: (res: any) => {
          if(res.status === 'success'){
            alert(res.message);
            this.router.navigate(['/dashboard']);
          } else{
            alert(res.massage);
          }  
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
  }
}
