import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

//////////////////////////

export class Customer {
  #id: number = 5;
  foo: string = '';

  get id() {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  constructor(name: string) {}

  #fooBar(arg: string): number {

    console.log(this.#id)

    setTimeout(() => {
      console.log(this.#id)
    }, 2000)

    return 5;
  }
}


const myCustomer = new Customer('Lisa');

/////////////////////////


/*const foo = function (arg: number): number {
  return arg + 1;
}

const foo2 = arg => arg + 1;

setTimeout(function () {
  console.log('HALLO WELT');
}, 2000);



const result = foo(5)
*/
