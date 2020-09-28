import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Subscription } from 'rxjs';
import { Itens } from '../../interfaces/itens';
import { ItemService } from '../../services/item.service';
import {DialogContentExample} from '../../itens/modal-itens/modal-itens.component';

@Component({
  selector: 'app-list-itens',
  templateUrl: './list-itens.component.html',
  styleUrls: ['./list-itens.component.scss']
})
export class ListItensComponent implements OnInit {
  subs: Subscription;
  displayedColumns: string[] = ['nome', 'unidadeProduto', 'quantidade', 'preco', 'perecivel', 'fabricacao', 'validade', 'action'];
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
    // this.itens.forEach(element => {
    //   if (element.id == id) {
    //     this.itens.splice(this.itens.indexOf(element), 1)
    //   }
    //   window.localStorage.setItem('item', JSON.stringify(this.itens))
    //   this.itens = JSON.parse(localStorage.getItem("item"));
    // });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogContentExample, {
      width: '1000px'
    });
    dialogRef.componentInstance.item = id

    dialogRef.afterClosed().subscribe(result => {
      this.itens = JSON.parse(localStorage.getItem("item"));
    });
  }
};
