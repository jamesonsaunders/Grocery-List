import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [
  ];

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth,
    private alertController: AlertController,) {
    
    this.afAuth.authState.subscribe(user => {
      if (user)
        this.listenToItems();
    });
  }

  listenToItems() {
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/items`,
    ref => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges().subscribe(colSnap => {
      this.items = [];
      colSnap.forEach(docSnap => {
        let item:any = docSnap.payload.doc.data();
        item.id = docSnap.payload.doc.id;
        this.items.push(item);
      });
    });
  }

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Please provide a grocery item name',
      inputs: [
        {
          name: 'itemName',
          type: 'text',
          placeholder: 'Grocery item name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();

    alert.onDidDismiss().then(result => {
      console.log(result);
      let text: string = result.data.values.itemName;
      console.log(text);
      if (!text || !text.trim())
        return;
      let timestamp = new Date();

      this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/items`).add({
        text,
        timestamp,
      });
    });
  }

  delete(item) {
    this.db.doc(`users/${this.afAuth.auth.currentUser.uid}/items/${item.id}`).delete();
  }

}
