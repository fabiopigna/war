import { Timsort } from './app/utility/Timsort';
import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { enableProdMode } from '@angular/core';


// if (environment.production) {
//   enableProdMode();
// }

// // platformBrowserDynamic().bootstrapModule(AppModule);


declare global {
  interface Array<T> {
    first(): T;
    takeFirst<R>(callback: (t: T) => R): R;
    isEmpty(): boolean;
    timsort(compare: (t0: T, t1: T) => number): void;
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


if (!Array.prototype.isEmpty) {
  Array.prototype.isEmpty = function <T>(): boolean {
    return this.length === 0;
  }
}
Timsort.run();

new AppComponent();
console.log('start')
