import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const isbnValidator = Validators.compose([
  Validators.required,
  Validators.minLength(10),
  Validators.maxLength(13),
  Validators.pattern(/^[0-9]*$/)
]) ?? Validators.nullValidator;

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        /*Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)*/
        isbnValidator
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    })
  });

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  hasError(control: FormControl, errorCode: string): boolean {
    return control.touched && control.hasError(errorCode);
  }
}
