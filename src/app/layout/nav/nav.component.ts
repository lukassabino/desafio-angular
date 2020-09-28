import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../assets/principal/nav-style.scss']
})
export class NavComponent implements OnInit {

  menus = [
    {link: 'lista', descricao: 'Listagem de Itens'},
    {link: 'item', descricao: 'Cadastro de Itens'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
