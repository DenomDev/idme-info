import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { HomeRoutingModule } from './home.routes';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
