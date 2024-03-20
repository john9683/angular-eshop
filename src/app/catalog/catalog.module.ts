import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CartModule } from 'src/app/cart/cart.module';
import { ToggleModule } from 'src/app/toggle/toggle.module';
import { CardModule } from 'src/app/card/card.module';
import { ProductModule } from 'src/app/product/product.module';
import { CatalogRoutingModule } from 'src/app/catalog/catalog-routing.module';
import { ButtonModule } from 'src/app/button/button.module';
import { LoaderModule } from 'src/app/loader/loader.module';
import { SearchModule } from 'src/app/search/search.module';
import { CatalogService } from '../services/catalog.service';
import { ImageComponent } from '../card/components/image/image.component';
import { CompanyComponent } from '../card/components/company/company.component';
import { PriceComponent } from '../card/components/price/price.component';
import { RatingComponent } from '../card/components/rating/rating.component';
import { TitleComponent } from '../card/components/title/title.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { ToggleGroupComponent } from './components/toggle-group/toggle-group.component';
import { NgForObjectDirective } from '../directives/ng-for-object.directive';
import { ClickCloseDirective } from '../directives/click-close.directive';
import { BorderRadiusDirective } from '../directives/border-radius.directive';
import { TooltipContainerDirective } from '../directives/tooltip-container.directive';
import { TooltipDirective } from '../directives/tooltip.directive';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { TooltipContentComponent } from '../components/tooltip-content/tooltip-content.component';

@NgModule({
    declarations: [
        CatalogComponent,
        ImageComponent,
        CompanyComponent,
        PriceComponent,
        RatingComponent,
        TitleComponent,
        ToggleComponent,
        ToggleGroupComponent,
        NgForObjectDirective,
        BorderRadiusDirective,
        TooltipDirective,
        TooltipContainerDirective,
        TooltipComponent,
        TooltipContentComponent
       ],
    providers: [CatalogService],
    exports: [CatalogComponent],
    imports: [
        CommonModule,
        CartModule,
        ToggleModule,
        CardModule,
        ProductModule,
        CatalogRoutingModule,
        ButtonModule,
        LoaderModule,
        SearchModule,
    ]
})
export class CatalogModule { }
