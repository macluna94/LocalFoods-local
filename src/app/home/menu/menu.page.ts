import { menuModel } from './../../menuModel';
import { TlocalService } from './../../tlocal.service';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  itemList: any = []
  localinfo: any = {};
  datos: any = {}
  idUser ="5f20bc5068f149c29e38403c"

  constructor(public alertCtrl: AlertController, private tlocalService: TlocalService,private router: Router) {}

  ngOnInit() {

   this.loadData()
  }

  /*
  ionViewWillEnter() {
  this.tlocalService.findLocal('5f20bc5068f149c29e38403c').subscribe(data => {
    this.localinfo = data
    this.itemList = this.localinfo.menu
    console.log(this.itemList);
  });
  }
  */


  async loadData(){
    await this.tlocalService.findLocal(this.idUser).subscribe(data => {
      this.localinfo = data
      this.itemList = this.localinfo.local.menu
      //console.log(this.localinfo.local.menu);
    });
  }




  async alertAddItem() {
    let alert = await this.alertCtrl.create({
      header: 'Nuevo Platillo',
      subHeader: 'Agrega el nombre y el precio',
      inputs: [
        {
          name: "name",
          type: 'text',
          placeholder: "Nombre del producto"
        }, {
          name: "price",
          type: 'number',
          placeholder: "$20.50"
        },
      ],
      buttons: [{
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            let i = data.name.length * 3 * data.price;
            if (data.name != '' && data.price != '') {
              console.log(data);
              this.itemList.push({
                _id: i,
                name: data.name,
                price: data.price
              })
            } else {
              alert.dismiss()
            }

          }
        }
      ]
    })

    await alert.present()
  }

  async alertDeleteItem(id: string) {
    let item = this.itemList.find(ele => {
      return ele._id === id
    })

    //console.log(item)

    let alert = await this.alertCtrl.create({
      header: 'Eliminar item',
      subHeader: '¿Estas seguro de elimnar?',
      message: item.name,
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          console.log("Cancelado");
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          //console.log(item.name + ' eliminado');

          this.itemList = this.itemList.filter(lugar => {
            
            //console.log(lugar._id);
            return lugar._id !== item._id

          })
          //console.log(this.itemList)
        }
      }]
    })

    alert.present()
  }

  async alertEditItem(id: number) {
    let item = this.itemList.find(ele => {
      return ele._id === id
    })
    console.log(item._id);
    

    let alert = await this.alertCtrl.create({
      header: 'Editar item',
      subHeader: 'Cambia los datos y selecciona "Guardar"',
      inputs: [
        {
          name: 'name',
          value: item.name,
          type: 'text'
        },
        {
          name: 'price',
          value: item.price,
          type: 'number'
        }
      ],
      buttons: ['Cancelar', {
        text: 'Guardar',

        handler: (data) => {

          if (data.nombre != '' && data.precio != '') {
            this.itemList.find(ele => {
              if (ele._id === id) {
                ele.name = data.name
                ele.price = data.price
              }
            })
            console.log(data);
          } else {
            alert.dismiss()
          }
        }
      }]
    })

    alert.present()
  }

  saveMenu() {
    let menu = []
    for(let item of this.itemList){
      console.log(item.name);
      menu.push({
        name: item.name,
        price: item.price
      })
    }
    console.log(menu);
    
    this.tlocalService.updateMenu(this.idUser, menu ).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/home'])
    })
    
  }

}