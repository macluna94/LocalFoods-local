import { TlocalService } from './../tlocal.service';
import { Component, OnInit } from '@angular/core';
import { DataLocal } from "../data-local";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  localinfo: any = {};
  datos: any = {}
  dataUser
  constructor(private tlocalService: TlocalService, private router: Router) { }

  ngOnInit() {
    //this.dataUser = this.router.getCurrentNavigation().extras.state.data
    console.log(this.dataUser);
    
    this.tlocalService.findLocal('5f31944e54fa970e1e23db56').subscribe(data => {
      let tmpData: any = data
      this.localinfo = tmpData.local
      console.log(this.localinfo);
    });
  }

  ionViewWillEnter() {
    //let data = this.router.getCurrentNavigation().extras.state.data
    console.log(this.dataUser);
    this.tlocalService.findLocal('5f31944e54fa970e1e23db56').subscribe(data => {
      let tmpData: any = data
      this.localinfo = tmpData.local
      console.log(this.localinfo);
    });
  }

  goMenu(){
    this.router.navigate(['home/menu'],{ state: 
      {data: {
      id: this.localinfo._id
    }}})  
    console.log("goToMenu");
    
  }



}
