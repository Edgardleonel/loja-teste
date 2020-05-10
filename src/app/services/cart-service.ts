import { Produto } from './../interface/produto';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CartService {

  public listProduct: Array<Object>;
  public selectedProduct: object;
  public compras;
  public total;
  public count;
  private user;
  private subject$ = new Subject();

constructor() {
  this.recuperar();
  console.log('this.listProduct', this.listProduct);
}

recuperar() {
  const recuperar = localStorage.getItem('compras');
  const recuperarCompras = JSON.parse(recuperar);
  if (recuperarCompras) {
    const uid = recuperarCompras[0].uid;
    console.log('recuperar uid', uid);
    const auth = localStorage.getItem('auth');
    if (uid === auth) {
    this.listProduct = recuperarCompras;
    } else {
      this.listProduct = [];
    }
  } else {
    this.listProduct = [];
  }
}

 saveCart() {
  const valid = {};
  this.listProduct = this.listProduct.filter(function(produto: Produto) {
  if (valid.hasOwnProperty(produto.id)) {
      return false;
  } else {
      valid[produto.id] = true;
      return true;
    }
  });

  console.log('adicionado no carrinho', this.listProduct);

  const user = localStorage.getItem('auth');

  this.user = this.listProduct.map((produto: Produto) =>
  produto.uid = user);
  console.log('user', this.user);

  if (this.listProduct.length > 0) {
  localStorage.setItem('compras', JSON.stringify(this.listProduct));
  }

  this.compras = this.listProduct.map((produto: Produto) =>
  produto.compras = produto.qtde * produto.preco );
  console.log('compras', this.compras);

  this.total = this.compras.reduce((total, numero) => {
     return total + numero;
    }, 0);
  console.log('total de compras', this.total);
  }

  emitirCout(count) {
    this.subject$.next(count);
  }

  getCart() {
    return this.subject$.asObservable();
  }
}
