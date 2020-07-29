import { TlocalService } from './../tlocal.service';
import { Component, OnInit } from '@angular/core';
import { DataLocal } from "../data-local";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  localinfo: any = {};
  datos: any = {}

  constructor(private tlocalService: TlocalService) { }

  ngOnInit() {

    this.tlocalService.findLocal('5f20bc5068f149c29e38403c').subscribe(data => {
      this.localinfo = data
      console.log(this.localinfo);
    });

    

  }

  ionViewWillEnter() {
    this.tlocalService.findLocal('5f20bc5068f149c29e38403c').subscribe(data => {
      this.datos = data
      this.localinfo = this.datos.local
      console.log(this.localinfo);
    });
  }


}
