import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[] ;
  private igChange : Subscription;
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChange=this.slService.changedIngredients.subscribe(
      (ingredient:Ingredient[])=>{
        this.ingredients=ingredient;
      }
    )
  }

  onEditItem(index: number) {
    this.slService.startEditing.next(index);
  }

  ngOnDestroy(): void {
      this.igChange.unsubscribe();
  }

}
