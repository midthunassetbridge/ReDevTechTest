import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';

import { JumbotronCounterComponent } from './components/jumbotron-counter/jumbotron-counter.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AppHttpInterceptor } from './http.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    ToastComponent,
    JumbotronCounterComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'sanctioned-entities',
  loadChildren: () => import('./sanctioned-entitiy/sanctioned-entity.module')
    .then(m => m.SanctionedEntitiesModule) },
    ])
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
