import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../apis/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  standalone: false,
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor(private auth: LoginService, private toastCtrl: ToastController) {}

  async sendReset(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;

    this.auth.sendResetLink(email).subscribe({
      next: async (res) => {
        const toast = await this.toastCtrl.create({
          message: 'Reset link sent. Check your inbox.',
          duration: 3000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: err.error.message || 'Failed to send reset link.',
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
