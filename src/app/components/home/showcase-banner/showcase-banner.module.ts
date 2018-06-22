import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseBannerComponent } from './showcase-banner.component';
import { FormsModule } from '@angular/forms';
import { SearchVehicleModule } from '../search-veihcle/search-vehicle.module';

@NgModule({
    declarations: [ShowcaseBannerComponent],
    imports: [CommonModule, FormsModule, SearchVehicleModule],
    exports: [ShowcaseBannerComponent],
    providers: [],
})
export class ShowcaseBannerModule { }