import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { CategoryComponent } from './category/category.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'category',
    component: CategoryComponent
  },
{
  path:'catalog',
    children: [
      {path: '',  loadChildren: () => import('./catalog/catalog.module').then(mod => mod.CatalogModule), data: {title: 'Каталог товаров'}},
    ]
},
{
  path:'product/:id',
    children: [
      {path: '',  loadChildren: () => import('./product/product.module').then(mod=> mod.ProductModule)},
    ]
},
{
  path:'favorites',
  component: FavoritesComponent
},
{
  path:'order',
  component: OrderComponent
},
{
  path:'registration',
  component: RegistrationComponent
},
{
  path:'not-found',
  component: NotFoundComponent
},
{
  path:'loader',
  component: LoaderComponent
},
{
  path:'**',
  redirectTo: 'not-found',
},
];

export const options: ExtraOptions = {
  enableTracing: false,
  preloadingStrategy: PreloadAllModules
}

@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppRoutingModule { }
