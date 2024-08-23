import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from 'src/app/top-bar/top-bar.module';
import { RegistrationModule } from 'src/app/registration/registration.module';
import { OrderModule } from 'src/app/order/order.module';
import { HomeModule } from 'src/app/home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { HttpCacheInterceptor } from './interseptors/http-cache.interceptor';
import { ButtonModule } from './button/button.module';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopBarModule,
    HomeModule,
    HttpClientModule,
    RegistrationModule,
    ButtonModule,
    OrderModule,
    CatalogModule,
    CartModule,
  ],
  providers: [
    {
    provide: LOCALE_ID,
    useValue: 'ru-RU'
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: '₽',
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCacheInterceptor,
    multi: true
  },
  DataService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
