import { CartService } from './../services/cart-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  public produto;
  public compras;
  public count;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getProdutos();
    this.cartService.getCart().subscribe(res => console.log('resultado service', this.count = res));
  }

  public getProdutos() {
    this.produto = this.cartService.selectedProduct;
    this.compras = this.produto.qtde * this.produto.preco;
  }
  public formatPreco = preco => preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  public addItem() {
    this.produto.qtde = 1;
    this.cartService.listProduct.push(this.produto);
    this.compras = this.produto.qtde * this.produto.preco;
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
  }

  public increment() {
    this.produto.qtde++;
    this.compras = this.produto.qtde * this.produto.preco;
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
  }

  public decrement() {
    this.produto.qtde--;
    if (!this.produto.qtde) {
      const index = this.cartService.listProduct.indexOf(this.produto);
      this.cartService.listProduct.splice(index, 1);
    }
    this.compras = this.produto.qtde * this.produto.preco;
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
  }
}
