import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart-service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  public produtos;
  public produto;
  public compras;
  public recuperarCompras;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.produtos = this.cartService.listProduct;
    this.compras = this.cartService.compras;
  }

  public formatPreco = preco => parseFloat(preco).toFixed(2).replace('.' , ',');

  public addItem(produto) {
    produto.qtde = 1;
    produto.compras =  produto.qtde * produto.preco;
    this.cartService.listProduct.push(produto);
  }

  public increment(produto) {
    produto.qtde++;
    produto.compras =  produto.qtde * produto.preco;
  }

  public decrement(produto) {
    produto.qtde--;
    produto.compras =  produto.qtde * produto.preco;
    if (!produto.qtde) {
      const index = this.cartService.listProduct.indexOf(produto);
      this.cartService.listProduct.splice(index, 1);
    }
  }

}
