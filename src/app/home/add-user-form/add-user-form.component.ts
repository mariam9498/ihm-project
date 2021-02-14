import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../api/user.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit, OnDestroy {
  name: string;
  job: string;
  newUser$: Subscription;

  constructor(
        public router: Router,
        public userService: UserService,
        public alertCtrl: AlertController
  ){}

  ngOnInit() {
    console.log('Add User init');
  }

  addUser(){
    this.newUser$ = this.userService.addUser(this.name, this.job).subscribe(
        async isCreated => {
          console.log(isCreated);
          let alert;
          if (isCreated){
            alert = await this.alertCtrl.create({
              header: 'Alert',
              message: 'User successfuly created',
              buttons: ['OK']
            });
            await alert.present();
          }
          else{
            alert = await this.alertCtrl.create({
              header: 'Alert',
              message: 'Error happened when creating user , try again',
              buttons: ['OK']
            });
            await alert.present();

          }
  }
  );
}

  ngOnDestroy(): void {
    this.newUser$.unsubscribe();
  }
}
