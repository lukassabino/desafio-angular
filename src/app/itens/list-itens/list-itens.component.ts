import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ItemService } from '../../services/item.service';
import {ModalItens} from '../../itens/modal-itens/modal-itens.component';

@Component({
  selector: 'app-list-itens',
  templateUrl: './list-itens.component.html',
  styleUrls: ['./list-itens.component.scss']
})
export class ListItensComponent implements OnInit {
  subs: Subscription;
  displayedColumns: string[] = ['nome', 'unidade', 'quantidade', 'preco', 'perecivel', 'fabricacao', 'validade', 'action'];
  itens = []
  itensAlterados = []

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.itens = JSON.parse(localStorage.getItem("item"));
  }

  deletar(id: number) {
    this.itemService.delete(id);
    this.itens = JSON.parse(localStorage.getItem("item"));
  }

  openModalItem(id: number) {
    const modalItem = this.dialog.open(ModalItens, {
      width: '1000px'
    });
    modalItem.componentInstance.item = id
    modalItem.afterClosed().subscribe(result => {
      this.itens = JSON.parse(localStorage.getItem("item"));
    });
  }
};
