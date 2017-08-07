import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule, MdMenuModule,
  MdSelectModule, MdTabsModule, MdToolbarModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { WalletService } from './services/wallet.service';
import { WalletsComponent } from './components/pages/wallets/wallets.component';
import { WalletDetailComponent } from './components/pages/wallets/address-detail/wallet-detail.component';
import { CreateWalletComponent } from './components/pages/wallets/create-wallet/create-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkyPipe } from './pipes/sky.pipe';
import { SendSkycoinComponent } from './components/pages/send-skycoin/send-skycoin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HistoryComponent } from './components/pages/history/history.component';
import { DateFromNowPipe } from './pipes/date-from-now.pipe';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
import { TransactionComponent } from './components/pages/transaction/transaction.component';
import { BackButtonComponent } from './components/layout/back-button/back-button.component';
import { ExplorerComponent } from './components/pages/explorer/explorer.component';
import { BlockchainService } from './services/blockchain.service';
import { DateTimePipe } from './pipes/date-time.pipe';
import { TransactionsAmountPipe } from './pipes/transactions-amount.pipe';
import { BlockComponent } from './components/pages/block/block.component';
import { AddressComponent } from './components/pages/address/address.component';
import { PendingTransactionsComponent } from './components/pages/settings/pending-transactions/pending-transactions.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'wallets',
    pathMatch: 'full'
  },
  {
    path: 'wallets',
    component: WalletsComponent,
    data: {
      breadcrumb: 'Wallets',
    },
  },
  {
    path: 'send',
    component: SendSkycoinComponent,
    data: {
      breadcrumb: 'Send Skycoin',
    },
  },
  {
    path: 'history',
    children: [
      {
        path: '',
        component: HistoryComponent,
        data: {
          breadcrumb: 'History',
        },
      },
      {
        path: ':transaction',
        component: TransactionComponent,
        data: {
          breadcrumb: 'Transaction',
        },
      },
    ],
  },
  {
    path: 'explorer',
    children: [
      {
        path: '',
        component: ExplorerComponent,
        data: {
          breadcrumb: 'Explorer',
        },
      },
      {
        path: 'address/:address',
        component: AddressComponent,
        data: {
          breadcrumb: 'Address',
        },
      },
      {
        path: ':block',
        component: BlockComponent,
        data: {
          breadcrumb: 'Block',
        },
      },
      {
        path: 'transaction/:transaction',
        component: TransactionComponent,
        data: {
          breadcrumb: 'Transaction',
        },
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'pending-transactions',
        component: PendingTransactionsComponent,
        data: {
          breadcrumb: 'Pending transactions',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    WalletsComponent,
    WalletDetailComponent,
    CreateWalletComponent,
    SkyPipe,
    SendSkycoinComponent,
    DateFromNowPipe,
    BreadcrumbComponent,
    TransactionComponent,
    BackButtonComponent,
    ExplorerComponent,
    DateTimePipe,
    TransactionsAmountPipe,
    BlockComponent,
    AddressComponent,
    PendingTransactionsComponent,
  ],
  entryComponents: [
    CreateWalletComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    NgxDatatableModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    ApiService,
    BlockchainService,
    WalletService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
