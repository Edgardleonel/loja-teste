import { CartService } from './../services/cart-service';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthProvider } from '../services/auth';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() modal;
  @Output() mudouModal = new EventEmitter();
  public count;
  public loader: boolean;
  public on: boolean = false;
  public off: boolean = true;

  constructor(
    private cartService: CartService,
    private auth: AuthProvider,
  ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(res => console.log('resultado count', this.count = res));
    this.isAuth();
  }

  async isAuth() {
    const user = await this.auth.authState();
    if (user) {
      this.on = true;
      this.off = false;
    } else {
      this.on = false;
      this.off = true;
    }
  }

  public enter() {
    this.mudouModal.emit(this.modal = true);
    console.log(this.mudouModal.emit(this.modal = true));
  }

  public logout() {
    if (this.cartService.listProduct.length === 0 ) {
      localStorage.removeItem('compras');
    } else {
      const update = this.cartService.listProduct;
      localStorage.setItem('compras', JSON.stringify(update));
    }
    this.auth.logout();
    localStorage.removeItem('auth');
    this.loader = true;
    setTimeout(() => location.reload(), 1000);
  }

}
