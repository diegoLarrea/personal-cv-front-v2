import { Component, OnInit } from '@angular/core';
import { TableMaganer } from 'src/app/_utils/table.manager';
import { UserService } from 'src/app/_services/user.service';
import { Persona } from 'src/app/_models/persona';
import { Paises } from 'src/app/_utils/paises';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tableManager = new TableMaganer();
  loading = true;
  personas: Persona[] = [];
  p: number = 1;
  total: number = null;
  paises = [];
  filters = {
    nombres: null,
    apellidos: null,
    fecha_nacimiento: null,
    pais: null,
    documento: null,
    ciudad: null,
    email: null
  }
  constructor(private apiUser: UserService) {
    let headers = [
      { columnName: "Documento", by: "documento" },
      { columnName: "Nombre", by: "nombres" },
      { columnName: "F. Nac.", by: "fecha_nacimiento" },
      { columnName: "Email", by: "email" },
      { columnName: "Acciones", by: null }
    ];
    this.tableManager.init(headers, 1);
    this.paises = Paises.paises;
  }

  ngOnInit(): void {
    this.getUsuarios(1);
  }

  getUsuarios(page){
    this.loading = true;
    this.tableManager.setFilters(this.filters);
    this.tableManager.params.page = page;
      this.apiUser.get(this.tableManager.params).subscribe(
        data => {
          this.personas = data.items;
          this.total = data.total;
          this.p = page;
          this.loading = false;
        }
      )
  }

  limpiarFiltros(){
    this.filters.nombres = null;
    this.filters.apellidos = null;
    this.filters.documento = null;
    this.filters.ciudad = null;
    this.filters.pais = null;
    this.filters.email = null;
    this.filters.fecha_nacimiento = null;

    this.tableManager.reset(1);
    this.tableManager.setFilters(this.filters);

    this.getUsuarios(1);
  }
}
