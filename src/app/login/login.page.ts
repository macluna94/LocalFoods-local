import { TlocalService } from './../tlocal.service';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSumitted = false;
  resp: any = {}
  constructor(private toastCtrl: ToastController,private formBuild: FormBuilder, private tlocalServices: TlocalService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuild.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }
  get errorControl(){
    return this.loginForm.controls;
    }

  submitLogin(){
    this.isSumitted = true;
    if (!this.loginForm.valid) {
      console.log('Datos incompletos')
    } else {
      let datos = this.loginForm.value
      this.tlocalServices.sendLogin(datos).subscribe(result => {
        this.resp = result
        let usuario = this.resp.usuario.usuario
        let idusuario = this.resp.usuario._id
        console.log(usuario +"\n"+idusuario);
        
        this.checkToast('Bienvenido',this.resp.usuario.usuario, 'primary')
        this.router.navigate(['/home'],{ state: 
          {data: {
          id: idusuario,
          usuario: usuario
        }}})
        
      }, err => {
        this.resp = err
        console.log(this.resp.error.error);
        let msn = this.resp.error.error
        this.checkToast('Algo salio mal',msn, 'danger' )
        
      })
    }
  }

  async checkToast(title: string,msn: string, color: string){
    const toast = await this.toastCtrl.create({
      header: title,
      message: msn,
      duration: 2000,
      position: 'bottom',
      color: color,
      mode:'md'
    });
    toast.present();
  }
}
