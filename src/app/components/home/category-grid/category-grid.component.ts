import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/category/category';
import { Globals } from '../../../models/globals';
import { CategoryService } from '../../../services/category.service';
import { Store } from '../../../models/store/store';
import { StoreService } from '../../../services/store.service';
import { AppCore } from '../../../app.core';

@Component({
    selector: 'app-category-grid',
    templateUrl: '../../../template/home/category-grid/category-grid.html',
    styleUrls: ['../../../template/home/category-grid/category-grid.scss']
})
export class CategoryGridComponent implements OnInit {
    @Input() isLoggedIn: boolean = false;    
    @Input() store: Store;
    categories: Category[] = [];
    mediaPath: string;
    
    constructor(
        private service: CategoryService,
        private storeService: StoreService,
    ) { }

    ngOnInit() {         
        this.service.getTree()
        .subscribe(categories => {
            this.categories = categories;
        }, error => {
            console.log(error);
        });
    }
    
    getMediaPath():string {
        return `${this.store.link}/static/categories/`;
    }    

    getRoute(category: Category): string {
        return `/categoria/${category.id}/${AppCore.getNiceName(category.name)}`;
    }
}