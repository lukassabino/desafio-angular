import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItensComponent } from './itens/itens.component';
import { FormsModule } from '@angular/forms';
import { ListItensComponent } from './itens/list-itens/list-itens.component';
import { ContainerComponent } from './layout/container/container.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ItemService } from './services/item.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { DialogContentExample } from './itens/modal-itens/modal-itens.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'
 
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ItensComponent,
    ListItensComponent,
    ContainerComponent,
    HeaderComponent,
    NavComponent,
    DialogContentExample
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatListModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StorageServiceModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    HttpClientModule

  ],
  providers: [ItemService,  
    [{provide: localePt, useValue: 'pt-BR'}], [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
