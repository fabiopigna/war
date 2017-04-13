import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global {
  interface Array<T> {
    first(): T;
    takeFirst<R>(callback: (t: T) => R): R;
  }
}

if (!Array.prototype.first) {
  Array.prototype.first = function <T>(): T {
    return this.length > 0 ? this[0] : undefined;
  }
}


if (!Array.prototype.takeFirst) {
  Array.prototype.takeFirst = function <T, R>(callback: (t: T) => R): R {
    if (this.length > 0) {
      return callback(this.first());
    }
  }
}