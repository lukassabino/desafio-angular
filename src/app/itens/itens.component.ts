import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {
  formularioProduto: FormGroup;
  itens = []
  mask = "separator.3";
  separatorLimit = "100000";
  suffix = 'un';
  validadeInvalida = false;
  unidades = [
    {value: 'un', textValue: 'Unidade'},
    {value: 'kg', textValue: 'Quilos'},
    {value: 'lt', textValue: 'Litros'}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.formularioProduto = this.formBuilder.group({
      id: [null],
      nomeProduto: [null, Validators.required],
      unidadeProduto: [null, Validators.required],
      quantidade: [null],
      preco: [null, Validators.required],
      perecivel: [null],
      validade: [null],
      fabricacao: [null]
    });
  }

  ajustaMask() {
    this.suffix = this.formularioProduto.get('unidadeProduto').value;
    if (this.formularioProduto.get('unidadeProduto').value == 'un') {
      this.separatorLimit = "";
      this.mask = "0000";
    }
    else {
      this.mask = "separator.3";
      this.separatorLimit = "100000";
    }
  }

  verificaValidade() {
    if (this.formularioProduto.get('validade').value == null && this.formularioProduto.get('perecivel').value == true) {
      this.formularioProduto.get('validade').setErrors({invalid: true});
      return true;
    }
    if (this.formularioProduto.get('validade').value == null) {
      return false;
    }
    if (this.formularioProduto.get('validade').value < new Date) {
      this.formularioProduto.get('validade').setErrors({invalid: true});
      return true;
    }
  }

  verificaFabricacao() {
    if (this.formularioProduto.get('fabricacao').value == null) {
      return false;
    }
    if (this.formularioProduto.get('perecivel').value == true 
        && this.formularioProduto.get('fabricacao').value > this.formularioProduto.get('validade').value) {
      this.formularioProduto.get('fabricacao').setErrors({invalid: true});
      return true;
    }
  }

  onSubmit() {
    if (this.verificaValidade() == true || this.verificaFabricacao() == true) {} 
    else {
      this.itemService.save(this.formularioProduto)
    }
  }
}