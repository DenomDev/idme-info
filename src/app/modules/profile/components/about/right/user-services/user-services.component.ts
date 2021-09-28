import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'app/models/service.model';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html'
})
export class UserServicesComponent implements OnInit {
  @Input() user: User;
  services: Service[];
  allServices: Service[];
  loaded: boolean;
  constructor(private auth: AuthService, private fs: FirestoreService) {}
  ngOnInit(): void {
    this.fs.getCollection('services').subscribe(s => {
      this.allServices = s as any;
      this.services = this.user.services;
      this.loaded = true;
    });
  }

  async addService(name) {
    const existsInUser = this.services.some(x => x.name === name);
    if (existsInUser) {
    } else {
      let existsInGlobal;
      this.allServices.some(x => {
        if (x.name === name) {
          const sk = {
            id: x.id,
            name
          };
          this.services.push(sk);
          existsInGlobal = true;
          this.updateServices();
        }
      });
      if (!existsInGlobal) {
        this.fs.createDocument('services', { name }).then(s => {
          const sk = {
            id: (s as any).id,
            name
          };
          this.services.push(sk);
          this.updateServices();
        });
      }
    }
  }
  updateServices() {
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      services: this.services
    });
  }
  async onInput(event) {
    if ((event || '').trim()) {
      await this.addService(event);
    }
  }
  async onSelect(event) {
    this.allServices.some(x => {
      if (x.name === event) {
        this.services.push(x);
        this.updateServices();
      }
    });
  }

  onRemove(event) {
    const index = this.services.indexOf(event);
    if (index >= 0) {
      this.services.splice(index, 1);
      this.updateServices();
    }
  }
}
