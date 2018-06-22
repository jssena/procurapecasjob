import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryGridComponent } from './category-grid.component';
import { RouterModule } from '@angular/router';
import { GroupModule } from '../group/group.module';

@NgModule({
    declarations: [ CategoryGridComponent ],
    imports: [ CommonModule, RouterModule, GroupModule ],
    exports: [ CategoryGridComponent ],
    providers: [],
})
export class CategoryGridModule {}