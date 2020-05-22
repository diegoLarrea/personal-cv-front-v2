import { Component, OnInit } from '@angular/core';
import { ConfigBase } from 'src/app/_models/configBase';
import { NivelService } from 'src/app/_services/niveles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {

  constructor(private apiNivel: NivelService, private toastr: ToastrService) { }

  niveles: ConfigBase[] = [];
  p: number = 1;
  itemspp: number = 10;

  nivelEdit: ConfigBase = new ConfigBase();
  nivelAdd: ConfigBase = new ConfigBase();
  nivelDelete: ConfigBase = new ConfigBase();
  nivelDeletePos = null;

  ngOnInit(): void {
    this.getNiveles();
  }

  getNiveles(){
    this.apiNivel.getNiveles().subscribe(
      data => {
        this.niveles = data;
      }
    )
  }

  putNivel(){
    if(this.check(this.nivelEdit)){
      this.apiNivel.putNivel(this.nivelEdit.id, this.nivelEdit).subscribe(
        data => {
          this.toastr.success("Nivel modificado");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  postNivel(){
    if(this.check(this.nivelAdd)){
      this.apiNivel.postNivel(this.nivelAdd).subscribe(
        data => {
          this.toastr.success("Nivel agregado");
          this.nivelAdd.id = data.id;
          this.niveles.push(this.nivelAdd);
          this.nivelAdd = new ConfigBase();
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  deleteNivel(){
    this.apiNivel.deleteNivel(this.nivelDelete.id).subscribe(
      data => {
        this.toastr.success("Nivel eliminado");
        this.niveles.splice(this.nivelDeletePos, 1);
      }
    )
  }

  check (obj: ConfigBase) {
    return obj.nombre != null && obj.nombre != "";
  }
}
