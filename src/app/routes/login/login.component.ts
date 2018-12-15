import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  screenHeight: number;
  screenWidth: number;
  loginCredentials: any = {};
  regCredentials: any = {};
  loginFlag: boolean;
  registerFlag: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = event.target.innerHeight - 40;
    this.screenWidth = event.target.innerWidth + 15;
  }

  onLogin(): void {
    if (this.loginCredentials.id === 'oldChaps' && this.loginCredentials.pwd === 'abcdefgh') {
      console.log(true);
      this.router.navigate(['home']);
    } else {
      console.log(this.loginCredentials);
    }
  }

  onRegister(): void {}

  constructor(private router: Router) { }

  ngOnInit() {
    this.screenHeight = window.innerHeight - 50;
    this.screenWidth = window.innerWidth;
  }

}
