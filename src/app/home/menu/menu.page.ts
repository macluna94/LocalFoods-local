import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  itemList = [{
      id: 0,
      name: "Chocoroles",
      price: 15
    },
    {
      id: 1,
      name: "Gansito",
      price: 10
    }, {
      id: 2,
      name: "Pinguinos",
      price: 16
    }, {
      id: 3,
      name: "Vianetta",
      price: 45
    }, {
      id: 4,
      name: "Pollo Completo",
      price: 250
    }
  ]


  constructor(public alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {


  }

  async alertAddItem() {
    let alert = await this.alertCtrl.create({
      header: 'Nuevo Platillo',
      subHeader: 'Agrega el nombre y el precio',
      inputs: [{
          name: "id",
          type: 'number',
          placeholder: "id"
        },
        {
          name: "nombre",
          type: 'text',
          placeholder: "Nombre del producto"
        }, {
          name: "precio",
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

            if (data.nombre != '' && data.precio != '') {
              console.log(data);
              this.itemList.push({
                id: data.id,
                name: data.nombre,
                price: data.precio
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

  async alertDeleteItem(id: number) {
    let itemid = this.itemList.find(ele => {
      return ele.id === id
    })

    console.log(itemid)

    let alert = await this.alertCtrl.create({
      header: 'Eliminar item',
      subHeader: '¿Estas seguro de elimnar?',
      message: itemid.name,
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          console.log("Cancelado");
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          console.log(itemid.name + ' eliminado');
          console.log("Item to delete: " + id);

          this.itemList = this.itemList.filter(lugar => {
            console.log(lugar.id);
            return lugar.id !== itemid.id
          })
          console.log(
            this.itemList
          )
        }
      }]
    })

    alert.present()
  }

  async alertEditItem(id: number) {
    let itemid = this.itemList.find(ele => {
      return ele.id === id
    })

    let alert = await this.alertCtrl.create({
      header: 'Editar item',
      subHeader: 'Cambia los datos y selecciona "Guardar"',
      inputs: [{
          name: 'id',
          value: itemid.id,
          type: 'number'
        },
        {
          name: 'nombre',
          value: itemid.name,
          type: 'text'
        },
        {
          name: 'precio',
          value: itemid.price,
          type: 'number'
        }
      ],
      buttons: ['Cancelar', {
        text: 'Guardar',

        handler: (data) => {

          if (data.nombre != '' && data.precio != '') {
            this.itemList.find(ele => {
              if (ele.id === id) {
                ele.id = data.id
                ele.name = data.nombre
                ele.price = data.precio
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

  saveMenu() {}

}