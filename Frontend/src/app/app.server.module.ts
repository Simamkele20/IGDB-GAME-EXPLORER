// src/app/app.server.module.ts

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; // Import your main app module

@NgModule({
  imports: [
    AppModule, // Import the main app module
    ServerModule, // Import the server module
  ],

})
export class AppServerModule {}
