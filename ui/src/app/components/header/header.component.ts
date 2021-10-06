import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  logoutt(){
    this.auth.logout().subscribe(res=>{
      if (res['message'] === "success") {
        localStorage.removeItem("currentUser")
        this.route.navigate(["/login"])
      }
    })
  }

}
