import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule(
  {
    exports: [RouterModule],
    imports: [RouterModule, CommonModule]
  }
)
export class SharedModule {
}
