import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  private selectedUserId: number;

  userDetail$: Observable<any>;

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router,
  ) { }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
  ngOnInit() {
    this.selectedUserId = this.actRoute.snapshot.params.id;
    this.userDetail$ = this.userService.getUserDetail(this.selectedUserId);
  }

}
