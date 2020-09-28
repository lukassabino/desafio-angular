import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Itens } from '../../interfaces/itens';

@Component({
  selector: 'modal-itens',
  templateUrl: 'modal-itens.component.html',
  styleUrls: ['./modal-itens.component.scss']
})
export class ModalItens {
  formularioItem: FormGroup;
  itens = []
  item: number;
  Iitens: Itens;
  url: any;
  unidades = [
    { value: 'un' },
    { value: 'kg' },
    { value: 'lt' }
  ]

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalItens>) { }

  ngOnInit() {
    this.buscaItens(this.item);
    this.formularioItem = this.formBuilder.group({
      id: [this.Iitens.id],
      nomeItem: [this.Iitens.nomeItem, Validators.required],
      // imagemProduto: [this.Iitens.imagemProduto, Validators.required],
      unidadeProduto: [this.Iitens.unidade, Validators.required],
      quantidade: [this.Iitens.quantidade],
      preco: [this.Iitens.preco, Validators.required],
      perecivel: [this.Iitens.perecivel],
      validade: [this.Iitens.validade],
      fabricacao: [this.Iitens.fabricacao]
    });
  }

  private buscaItens(id: number) {
    this.itens = JSON.parse(localStorage.getItem("item"));
    this.itens.forEach(element => {
      if (element.id == this.item) {
        this.Iitens = element;
        return this.Iitens;
      }
    });
  }

  onSubmit() {
    this.itens.forEach(element => {
      if (element.id == this.formularioItem.value.id) {
        this.itens.splice(this.itens.indexOf(element), 1)
        this.itens.push(this.formularioItem.value);
      }
      window.localStorage.setItem('item', JSON.stringify(this.itens))
      this.itens = JSON.parse(localStorage.getItem("item"));
    });
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}