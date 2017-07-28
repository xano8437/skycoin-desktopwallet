import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { WalletModel } from '../models/wallet.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

@Injectable()
export class WalletService {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private apiService: ApiService
  ) {
    this.loadData();
  }

  addAddress(wallet: WalletModel) {
    return this.apiService.post('wallet/newAddress', {id: wallet.meta.filename});
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  create(label, seed) {
    return this.apiService.post('wallet/create', {label: label, seed: seed});
  }

  generateSeed(): Observable<string> {
    return this.apiService.get('wallet/newSeed').map(response => response.seed);
  }

  sendSkycoin(wallet_id: string, address: string, amount: number) {
    return this.apiService.post('wallet/spend', {id: wallet_id, dst: address, coins: amount});
  }

  sum(): Observable<number> {
    return this.all().map(wallets => wallets.map(wallet => wallet.balance >= 0 ? wallet.balance : 0).reduce((a , b) => a + b, 0));
  }

  private loadData(): void {
    this.retrieveWallets().first().subscribe(wallets => {
      this.wallets.next(wallets);
      this.refreshBalances();
    });
  }

  private refreshBalances() {
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.retrieveWalletBalance(wallet).map(response => {
        wallet.entries = response;
        wallet.balance = response.map(address => address.balance >= 0 ? address.balance : 0).reduce((a , b) => a + b, 0);
        return wallet;
      })))
        .subscribe(newWallets => this.wallets.next(newWallets));
    });
  }

  private retrieveAddressBalance(address: any|any[]) {
    const addresses = Array.isArray(address) ? address.map(address => address.address).join(',') : address.address;
    return this.apiService.get('balance', {addrs: addresses});
  }

  private retrieveWalletBalance(wallet: WalletModel): Observable<any> {
    return Observable.forkJoin(wallet.entries.map(address => this.retrieveAddressBalance(address).map(balance => {
      address.balance = balance.confirmed.coins;
      return address;
    })));
  }

  private retrieveWallets(): Observable<WalletModel[]> {
    return this.apiService.get('wallets');
  }
}
