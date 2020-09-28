import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {
  formularioItem: FormGroup;
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
    this.formularioItem = this.formBuilder.group({
      id: [null],
      nomeItem: [null, Validators.required],
      unidade: [null, Validators.required],
      quantidade: [null],
      preco: [null, Validators.required],
      perecivel: [null],
      validade: [null],
      fabricacao: [null]
    });
  }

  ajustaMask() {
    this.suffix = this.formularioItem.get('unidade').value;
    if (this.formularioItem.get('unidade').value == 'un') {
      this.separatorLimit = "";
      this.mask = "0000";
    }
    else {
      this.mask = "separator.3";
      this.separatorLimit = "100000";
    }
  }

  verificaValidade() {
    if (this.formularioItem.get('validade').value == null && this.formularioItem.get('perecivel').value == true) {
      this.formularioItem.get('validade').setErrors({invalid: true});
      return true;
    }
    if (this.formularioItem.get('validade').value == null) {
      return false;
    }
    if (this.formularioItem.get('validade').value < new Date) {
      this.formularioItem.get('validade').setErrors({invalid: true});
      return true;
    }
  }

  verificaFabricacao() {
    if (this.formularioItem.get('fabricacao').value == null) {
      return false;
    }
    if (this.formularioItem.get('perecivel').value == true 
        && this.formularioItem.get('fabricacao').value > this.formularioItem.get('validade').value) {
      this.formularioItem.get('fabricacao').setErrors({invalid: true});
      return true;
    }
  }

  onSubmit() {
    if (this.verificaValidade() == true || this.verificaFabricacao() == true) {} 
    else {
      this.itemService.save(this.formularioItem)
    }
  }
}