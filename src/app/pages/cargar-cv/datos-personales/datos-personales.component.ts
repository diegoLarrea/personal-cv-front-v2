import { Component, OnInit, Input } from '@angular/core';
import { Paises } from 'src/app/_utils/paises';
import { Persona } from 'src/app/_models/persona';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/_services/persona.service';
declare var $:any;
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  persona: Persona = new Persona();
  initializeCollapse = true;
  @Input() set datosPersonales(p: Persona){
    this.persona = p;
    if(this.persona.ha_trabajado != null){
      this.checkHeTrabajado = true;
      let value = JSON.parse(this.persona.ha_trabajado);
      this.heTrabajado.cargo = value.cargo;
      this.heTrabajado.supervisor = value.supervisor;
      this.heTrabajado.donde = value.donde;
    }

    if(this.persona.familiares != null){
      this.checkFamiliares = true;
      let values = JSON.parse(this.persona.familiares);
      this.familiares = [];
      for(let i=0; i<values.length; i++){
        this.familiares.push(values[i]);
      }
    }
  }

  paises = [];
  estadoCivilSelect = ["Soltero/a", "Casado/a", "Viudo/a"];
  checkFamiliares = false;
  checkHeTrabajado = false;
  heTrabajado = {
    cargo: null,
    supervisor: null,
    donde: null
  }
  familiares = [];
  constructor(private toastr: ToastrService, 
    private apiPersona: PersonaService) { }

  ngOnInit(): void {
    this.paises = Paises.paises;
    this.addFamiliar();
  }

  getPersona(){
    return this.persona;
  }

  addFamiliar(){
    this.familiares.push({nombre:null});
  }

  actualizar(){
    let familiares = [];
    if(this.checkFamiliares){
      for(let i=0; i<this.familiares.length; i++){
        if(this.familiares[i].nombre != null){
          familiares.push({nombre:this.familiares[i].nombre});
        }
      }
      if (familiares.length == 0){
        this.toastr.error("Complete los nombres de sus familiares");
        return;
      }
    }

    if(this.checkHeTrabajado && (this.heTrabajado.cargo == null || this.heTrabajado.supervisor == null || this.heTrabajado.donde == null)){
      this.toastr.error("Complete los campos de empleo anterior en Personal");
      return;
    }
    
    if(this.checkFamiliares){
      this.persona.familiares = JSON.stringify(familiares);
    }else{
      this.persona.familiares = null;
    }

    if(this.checkHeTrabajado){
      this.persona.ha_trabajado = JSON.stringify(this.heTrabajado);
    }else{
      this.persona.ha_trabajado = null;
    }

    

    this.apiPersona.putByUserId(this.persona.user, this.persona).subscribe(
      data => {
        this.toastr.success("Datos actualizados");
      }
    )
  }  

  changeRadioFamiliares(){
    if(!this.checkFamiliares){
      this.familiares = [{nombre:null}];
    }
  }

  changeRadioHeTrabajado(){
    if(!this.checkHeTrabajado){
      this.heTrabajado.cargo = null;
      this.heTrabajado.supervisor = null;
      this.heTrabajado.donde = null;
    }
  }
}

// {hasValues:true, values:[{}]}
