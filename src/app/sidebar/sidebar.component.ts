import { CartService } from './../services/cart-service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../services/auth';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public count;
  public modal: boolean;
  public loader: boolean;
  public form: FormGroup;
  public on: boolean = false;
  public off: boolean = true;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
  ) { }

  ngOnInit() {
    this.buidForm();
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

  buidForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  public login() {
    const data = this.form.value;
    this.auth.login(data)
      .then((res) => {
      localStorage.setItem('auth', res.user.uid);
      this.modal = false;
      this.loader = true;
      location.reload();
      }).catch((err) => {
        alert('Senha incorreta ou usuário não está cadastrado!');
      });
    this.loader = false;
    this.form.reset();
  }

  public enter() {
    this.modal = true;
  }

  public cancel() {
    this.modal = false;
  }

  public logout() {
    if (this.cartService.listProduct.length === 0 ) {
      localStorage.removeItem('compras');
    }
    this.auth.logout();
    localStorage.removeItem('auth');
    this.loader = true;
    location.reload();
  }

}
