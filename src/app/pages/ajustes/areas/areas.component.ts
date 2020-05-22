import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/_services/areas.service';
import { ConfigBase } from 'src/app/_models/configBase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  constructor(private apiArea: AreaService, private toastr: ToastrService) { }

  areas: ConfigBase[] = [];
  p: number = 1;
  itemspp: number = 10;

  areaEdit: ConfigBase = new ConfigBase();
  areaAdd: ConfigBase = new ConfigBase();
  areaDelete: ConfigBase = new ConfigBase();
  areaDeletePos = null;

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(){
    this.apiArea.getAreas().subscribe(
      data => {
        this.areas = data;
      }
    )
  }

  putArea(){
    if(this.check(this.areaEdit)){
      this.apiArea.putArea(this.areaEdit.id, this.areaEdit).subscribe(
        data => {
          this.toastr.success("Área modificada");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }

  }

  postArea(){
    if(this.check(this.areaAdd)){
      this.apiArea.postArea(this.areaAdd).subscribe(
        data => {
          this.toastr.success("Área agregada");
          this.areaAdd.id = data.id;
          this.areas.push(this.areaAdd);
          this.areaAdd = new ConfigBase();
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  deleteArea(){
    this.apiArea.deleteArea(this.areaDelete.id).subscribe(
      data => {
        this.toastr.success("Área eliminada");
        this.areas.splice(this.areaDeletePos, 1);
      }
    )
  }

  check (obj: ConfigBase) {
    return obj.nombre != null && obj.nombre != "";
  }
}
