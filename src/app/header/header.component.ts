import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
