import { ShoppingListService } from './shopping-list-services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredients[] = [
  //   new Ingredients('Apples', 5),
  //   new Ingredients('Tomotoes', 10),
  // ];

  // onIngredientAdded(ingredient: Ingredients) {
  //   this.ingredients.push(ingredient);
  // }
  ingredients: Ingredients[];
  private igChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem(index: number) {
    this.shoppingListService.editShoppingList.next(index);
  }
  OnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}
