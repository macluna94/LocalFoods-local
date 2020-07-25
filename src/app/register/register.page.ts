import { DataLocal } from './../data-local';
import { TlocalService } from './../tlocal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted= false;
  defaulTime= ['09:00', '09:00'];
  datos: DataLocal

  h1;
  h2;

  constructor(private tlocalServ: TlocalService,private formBuilder: FormBuilder, public toastCtrl: ToastController,  private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      horary: [this.defaulTime],
      categories: ['', [Validators.required]]
    })


  }

  get errorControl(){
  return this.registerForm.controls;
  }

  getTime(e, id:number){
    if (id == 1) {
      let date = new Date(e.target.value).toISOString().substring(11, 16);
      this.h1 = date 
      console.log(this.h1);
      
    }
    if(id == 2) {
      let date = new Date(e.target.value).toISOString().substring(11,16);
      this.h2 = date
      console.log(this.h2);
      
    }
  }

  submitForm(){
    let horario = [this.h1, this.h2]

    this.registerForm.get('horary').setValue(horario, {
      onlyself: true
    });
  


    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Campos incompletos');
      this.checkToast('Campos Incompletos', 'warning')
       
    } else {
      this.datos = this.registerForm.value
      console.log(this.datos);
      this.tlocalServ.sendRegister(this.datos).subscribe( res => {
        console.log("Enviado: "+res)
        this.checkToast('Enviado', 'primary')
        this.router.navigate(['/login'])

      })
      
    }
  }

    async checkToast(msn: string, color: string){
      const toast = await this.toastCtrl.create({
        message: msn,
        duration: 1500,
        position: 'top',
        color: color,
        mode:'md'
      });
      toast.present();
    }




}
