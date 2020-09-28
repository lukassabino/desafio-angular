import { FormGroup } from '@angular/forms';
import * as uuid from 'uuid';

export class ItemService {
  itens = [];
  constructor() { }

  save(formularioProduto: FormGroup) {

    formularioProduto.get('id').setValue(uuid.v4());    
    if (JSON.parse(localStorage.getItem("item")) == null) {
      this.itens = []
    }
    else {
      this.itens = JSON.parse(localStorage.getItem("item"));
    }
    this.itens.push(formularioProduto.value);
    window.localStorage.setItem('item', JSON.stringify(this.itens));
  }

  delete(id: number) {
    this.itens = JSON.parse(localStorage.getItem("item"));
    this.itens.forEach(element => {
      if (element.id == id) {
        this.itens.splice(this.itens.indexOf(element), 1)
      }
      window.localStorage.setItem('item', JSON.stringify(this.itens))
      this.itens = JSON.parse(localStorage.getItem("item"));
    });
  }


}
