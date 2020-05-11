import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../services/auth';
import { setInterval } from 'timers';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public count;
  @Input() modal: boolean;
  public loader: boolean;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
  ) { }

  ngOnInit(): void {
    this.buidForm();
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
      setTimeout(() => location.reload(), 1000);
      }).catch((err) => {
        alert('Senha incorreta ou usuário não está cadastrado!');
      });
    this.loader = false;
    this.form.reset();
  }

  public cancel() {
  this.modal = false;
  this.loader = true;
  setTimeout(() => location.reload(), 1000);
  }

}
