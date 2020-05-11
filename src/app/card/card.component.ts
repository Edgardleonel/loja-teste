import { Produto } from './../interface/produto';
import { AuthProvider } from './../services/auth';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { produtos } from '../database/produtos';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public produto;
  public produtos;
  public count;
  public logar: boolean;
  @Input() modal;
  @Output() mudouModal = new EventEmitter();

  constructor(
    private cartService: CartService,
    private router: Router,
    private auth: AuthProvider
    ) { }

  ngOnInit(): void {
    this.recuperar();
    this.cartService.getCart().subscribe(res => console.log('resultado service', this.count = res));
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
    this.isAuth();
  }

  openModal() {
    if (this.logar === false) {
      this.mudouModal.emit(this.modal = true);
      console.log(this.mudouModal.emit(this.modal = true));
    }

  }

  recuperar() {
    const recuperarProdutos = this.cartService.listProduct.concat(produtos);
    const valid = [];
    const unique = recuperarProdutos.filter(function(produto: Produto) {
    if (valid.hasOwnProperty(produto.id)) {
        return false;
    } else {
        valid[produto.id] = true;
        return true;
      }
    });
    this.produtos = unique;
    this.produtos.sort(function (a, b) {
      return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
    });
    console.log(this.produtos);
  }


  async isAuth() {
    const user = await this.auth.authState();
    if (user) {
      this.logar = true;
    } else {
      this.logar = false;
    }
  }

  public formatPreco = preco => preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  public addItem(produto) {
  produto.qtde = 1;
  this.cartService.listProduct.push(produto);
  const count = this.cartService.listProduct.length;
  this.cartService.emitirCout(count);
  }

  public increment(produto) {
    produto.qtde++;
    this.cartService.saveCart();
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
  }

  public decrement(produto) {
    produto.qtde--;
    if (!produto.qtde) {
      const index = this.cartService.listProduct.indexOf(produto);
      this.cartService.listProduct.splice(index, 1);
    }
    const count = this.cartService.listProduct.length;
    this.cartService.emitirCout(count);
  }

  public open(produto) {
    this.cartService.selectedProduct = produto;
    this.router.navigateByUrl('/detalhes');
  }

}
