import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http/http.service';
import { ProductsService } from './components/products/products.service';
import { AppPreloadingStrategy } from './utils/app.preloading-strategy';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    data: { preload: true },
  }
]

const appRouter: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouter
  ],
  providers: [ HttpService, ProductsService, AppPreloadingStrategy ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
