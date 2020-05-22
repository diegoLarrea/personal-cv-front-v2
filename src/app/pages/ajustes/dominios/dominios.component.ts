import { Component, OnInit } from '@angular/core';
import { ConfigBase } from 'src/app/_models/configBase';
import { DominioService } from 'src/app/_services/dominios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dominios',
  templateUrl: './dominios.component.html',
  styleUrls: ['./dominios.component.css']
})
export class DominiosComponent implements OnInit {

  constructor(private apiDominio: DominioService, private toastr: ToastrService) { }

  dominios: ConfigBase[] = [];
  p: number = 1;
  itemspp: number = 10;

  dominioEdit: ConfigBase = new ConfigBase();
  dominioAdd: ConfigBase = new ConfigBase();
  dominioDelete: ConfigBase = new ConfigBase();
  dominioDeletePos = null;

  ngOnInit(): void {
    this.getDominios();
  }

  getDominios(){
    this.apiDominio.getDominios().subscribe(
      data => {
        this.dominios = data;
      }
    )
  }

  putDominio(){
    if(this.check(this.dominioEdit)){
      this.apiDominio.putDominio(this.dominioEdit.id, this.dominioEdit).subscribe(
        data => {
          this.toastr.success("Dominio modificado");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }

  }

  postDominio(){
    if(this.check(this.dominioAdd)){
      this.apiDominio.postDominio(this.dominioAdd).subscribe(
        data => {
          this.toastr.success("Dominio agregado");
          this.dominioAdd.id = data.id;
          this.dominios.push(this.dominioAdd);
          this.dominioAdd = new ConfigBase();
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  deleteDominio(){
    this.apiDominio.deleteDominio(this.dominioDelete.id).subscribe(
      data => {
        this.toastr.success("Dominio eliminado");
        this.dominios.splice(this.dominioDeletePos, 1);
      }
    )
  }

  check (obj: ConfigBase) {
    return obj.nombre != null && obj.nombre != "";
  }
}
