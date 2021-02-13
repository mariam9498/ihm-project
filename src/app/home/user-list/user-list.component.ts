import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input()
  userList: any;

  @Output()
  selectedUser = new EventEmitter<number>();


  constructor(
    public userService: UserService
  ){}

  async deletedUser(id: number){
    this.userService.deleteUser(id)
  }
  ngOnInit() {
  }

  

}
