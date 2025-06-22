import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { loggedIn, loggedOut } from './auth.guard';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookAddComponent } from './book-add/book-add.component';
import { QuotesComponent } from './quote/quote.component';
import { RegisterComponent } from './register/register.component';
import { QuoteAddComponent } from './quote-add/quote-add.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuoteEditComponent } from './quote-edit/quote-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [loggedOut]},
    { path: 'register', component: RegisterComponent, canActivate: [loggedOut]},
    { path: 'books', component: BookComponent, canActivate: [loggedIn]},
    { path: 'books/edit/:id', component: BookEditComponent, canActivate: [loggedIn]},
    { path: 'books/add', component: BookAddComponent, canActivate: [loggedIn]},
    { path: 'quotes', component: QuotesComponent, canActivate: [loggedIn]},
    { path: 'quotes/add', component: QuoteAddComponent, canActivate: [loggedIn]},
    { path: 'quotes/edit/:id', component: QuoteEditComponent, canActivate: [loggedIn]},
    { path: 'my-quotes', component: MyQuotesComponent, canActivate: [loggedIn]}
];