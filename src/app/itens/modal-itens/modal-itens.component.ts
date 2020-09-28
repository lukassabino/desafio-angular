import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Itens } from '../../interfaces/itens';
import { HttpClient } from '@angular/common/http';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'modal-itens',
  templateUrl: 'modal-itens.component.html',
  styleUrls: ['./modal-itens.component.scss']
})
export class DialogContentExample {
    formularioProduto: FormGroup;
    itens = []
    item: number;
    produtos: Itens;
    url: any;
    unidades = [
      {value: 'un'},
      {value: 'kg'},
      {value: 'lt'}
    ]


  constructor(
     public dialog: MatDialog,
     private formBuilder: FormBuilder,
     private http: HttpClient,
     public dialogRef: MatDialogRef<DialogContentExample>) {}

  ngOnInit() {
    console.log(this.produtos + ' ANTES')
    this.buscaProduto(this.item);
    console.log(this.produtos + ' DPOIS')
    
    this.formularioProduto = this.formBuilder.group({
        id: [this.produtos.id],
        nomeProduto: [this.produtos.nomeProduto, Validators.required],
        // imagemProduto: [this.produtos.imagemProduto, Validators.required],
        unidadeProduto: [this.produtos.unidadeProduto, Validators.required],
        quantidade: [this.produtos.quantidade],
        preco: [this.produtos.preco, Validators.required],
        perecivel: [this.produtos.perecivel],
        validade: [this.produtos.validade],
        fabricacao: [this.produtos.fabricacao]
      });
  }
  
  private buscaProduto(id: number) {
    this.itens = JSON.parse(localStorage.getItem("item"));
    this.itens.forEach(element => {
        if (element.id == this.item) {
           this.produtos = element;
           console.log(this.produtos)
           return this.produtos;
        }
    });
  }

  onSubmit() {
    this.itens.forEach(element => {
      if (element.id == this.formularioProduto.value.id) {
        this.itens.splice(this.itens.indexOf(element), 1)
        this.itens.push(this.formularioProduto.value);
      }
      window.localStorage.setItem('item', JSON.stringify(this.itens))
      this.itens = JSON.parse(localStorage.getItem("item"));
    });
    this.closeModal();  
    
  }

  closeModal() {
    this.dialogRef.close();
  }

  inputFileChange(imageInput: any) {

    // console.log(event)
    // const selectedFile = event.srcElement.files[0];
    // console.log(selectedFile)
    // document.getElementById('imagemTeste').innerHTML = selectedFile;
    //   if (event.target.files && event.target.files[0]) {
    //       const foto = event.target.files[0];

    //       const formData = new FormData();
    //       formData.append('foto', foto);

    //       this.http.post('http://localhost:8080/fotos', formData)
    //       .subscribe(resposta => console.log('Upload ok'));
    //   }

    
        // var imgLoca = document.getElementById('imagemTeste');
        // var file = event.srcElement.files[0];
        // var img = document.createElement('img');
        // console.log(img + ' IMG')
        //     img.src =  file;
    
            
        //     var reader = new FileReader();
        //     reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
        //     reader.readAsDataURL(file);
            // imgLoca.appendChild(file)
            

//             var imgLoca = document.getElementById('imagemTeste')
//             var file = event.srcElement.files[0];
//             var img = document.createElement("img");
//                 img.src = file;
        
//                 imgLoca.appendChild(img)
//             var reader = new FileReader();
//                 reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
//                 reader.readAsDataURL(file);
// console.log(file)



    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.url = event.target.result;

    //     console.log(this.url)
    //     document.getElementById('imagemTeste').innerHTML = this.url;
    //   }
    // }
 
}
}