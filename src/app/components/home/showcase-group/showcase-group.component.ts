import {
    Component, OnInit, SimpleChanges, OnChanges,
    ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked, OnDestroy
} from '@angular/core';
import { PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Store } from '../../../models/store/store';
import { ShowcaseGroup } from '../../../models/showcase/showcase-group';
import { Product } from '../../../models/product/product';
import { ShowCaseService } from '../../../services/showcase.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

declare var $: any;

const PRODUCTS_KEY = makeStateKey('products_key');

@Component({
    selector: 'app-showcase-group',
    templateUrl: '../../../template/home/showcase-group/showcase-group.html',
    styleUrls: ['../../../template/home/showcase-group/showcase-group.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseGroupComponent implements OnChanges, AfterViewChecked, OnDestroy {
    @Input() group: ShowcaseGroup;
    @Input() store: Store;

    products: Product[];

    constructor(
        private showcaseService: ShowCaseService,
        private changeRef: ChangeDetectorRef,
        private state: TransferState,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['group'] || changes['store']) {
            if (!this.group || !this.store) {
                return;
            }
            this.fetchProducts(this.group.id);
        }
    }

    ngOnDestroy(): void {
        this.state.remove(PRODUCTS_KEY);
    }

    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            

            const selector = $(`.slides-3 #group-${this.group.id}`);

            //seletor slider
            const selector2 = $(`.slides-4 #group-${this.group.id}`);

            if (this.products
                && this.products.length > 0
                && selector.children('div').length > 1
                && selector.children('.owl-stage-outer').length == 0
                || selector2.children('div').length > 1
                || selector2.children('.owl-stage-outer').length == 0
                 
            ) {
                
                const slide3= 3;
                const slide4= 4;
                selector.not('.slick-initialized').slick({
                  
                  slidesToShow: slide3,
                  rows:2,
                  responsive: [
                    {
                    breakpoint: 1024,
                    settings: "unslick"
                    },
                    {
                    breakpoint: 600,
                    settings: "unslick"
                    },
                    {
                    breakpoint: 481,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                    }
                ]
                 
                });

                selector2.not('.slick-initialized').slick({
                // centerMode: true,
                centerPadding: '15px',
                slidesToShow: slide4,
                responsive: [
                    {
                    breakpoint: 1024,
                    settings: "unslick"
                    },
                    {
                    breakpoint: 600,
                    settings: "unslick"
                    },
                    {
                    breakpoint: 481,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                    }
                ]
                });
                
                // selector2.owlCarousel({
                //     items: slide4,
                //     margin: 10,
                //     loop: true,
                //     nav: true,
                //     navText: [
                //         '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                //         '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                //     ],

                    
                //     dots: false,
                //     autoplay: true,
                //     autoplayTimeout: 5000,
                //     autoplayHoverPause: true,
                //     responsive: {
                //         0: { items: 1 },
                //         768: { items: slide4 },
                //         992: { items: slide4 },
                //         1200: { items: slide4 }
                //     }
                // });

              
            } 
        }
    }

    hasProducts(): boolean {
        if (this.products && this.products.length > 0) {
            return true;
        }
        return false;
    }

    private createSlick(){

    }

    private fetchProducts(id: string): void {
        this.products = this.state.get(PRODUCTS_KEY, null as any);
        if (this.products) {
            this.changeRef.detectChanges();
            return; 
        }

        this.showcaseService.getGroupProducts(id).subscribe(
            products => {
                this.state.set(PRODUCTS_KEY, products as any);
                this.products = products;
                this.changeRef.detectChanges();
            }
        )
    }
}