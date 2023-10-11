import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru'; // русская локаль
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
import { ClickCloseDirective } from './directives/click-close.directive';
import { BorderRadiusDirective } from './directives/border-radius.directive';
import { CartModule } from './cart/cart.module';
import { SliderDirective } from './directives/slider.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipContainerDirective } from './directives/tooltip-container.directive';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    // TooltipComponent,
    // TooltipDirective,            // почему-то отсюда директивы не видны
    // TooltipContainerDirective,  // почему-то отсюда директивы не видны
    // SliderDirective,       // почему-то отсюда директивы не видны
    // BorderRadiusDirective, // почему-то отсюда директивы не видны
    // ClickCloseDirective,   // почему-то отсюда директивы не видны
    // NgForObjectDirective,  // почему-то отсюда директивы не видны
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
