import { Routes } from '@angular/router';
import { ImageComponent } from './Components/image/image.component';
import { ProductComponent } from './Components/product/product.component';

export const routes: Routes = [
    {
        path : '',
        component : ProductComponent
    },
    {
        path : 'login',
        loadComponent : () => import('./Components/login/login.component').then(x => x.LoginComponent)
    },
    {
        path : 'signup',
        loadComponent : () => import('./Components/signup/signup.component').then(x => x.SignupComponent)
    },
    {
        path : 'image',
        loadComponent : () => import('./Components/image/image.component').then(x => x.ImageComponent)
    },
    {
        path : 'productDetail/:productId',
        loadComponent : () => import('./Components/product-detail/product-detail.component').then(x => x.ProductDetailComponent)
    },
    {
        path : 'cart',
        loadComponent : () => import('./Components/cart/cart.component').then(x => x.CartComponent)
    },
    {
        path : 'myAccount',
        loadComponent : () => import('./Components/my-account/my-account.component').then(x => x.MyAccountComponent)
    },
    {
        path : 'order',
        loadComponent : () => import('./Components/order/order.component').then(x => x.OrderComponent)
    }
];
