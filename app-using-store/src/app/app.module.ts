import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users/users.effects';
import { usersReducer } from './users/users.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot({users: usersReducer}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([UsersEffects])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
