import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { OfertaLaboral } from '../_models/ofertaLaboral';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Images } from '../_utils/images64';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  async empleosExcel(empleos: OfertaLaboral[]) {
    var datePipe = new DatePipe('en-US');
    let data: any = [];

    for (let i = 0; i < empleos.length; i++) {
      empleos[i].descripcion = empleos[i].descripcion
        .replace(/<\/p>/gi, "\n")
        .replace(/<br\/?>/gi, "\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "");
      empleos[i].requisitos = empleos[i].requisitos
        .replace(/<\/p>/gi, "\n")
        .replace(/<br\/?>/gi, "\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "");
      data.push(
        [
          empleos[i].oportunidad,
          empleos[i].descripcion,
          empleos[i].requisitos,
          empleos[i].tipo,
          empleos[i].area.nombre,
          empleos[i].localidad.nombre,
          empleos[i].nivel.nombre,
          empleos[i].dominio.nombre,
          empleos[i].fecha_creacion,
        ]
      )
    }

    const title = "Informe de empleos";
    const headers = ["Oportunidad", "Descripción", "Requisitos", "Tipo", "Área", "Localidad", "Nivel", "Dominio", "Fecha creación"];

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Empleos');

    //Se agrega logo
    let imageRow = worksheet.addRow(["", "", "", "", "", "", "", "", ""]);
    imageRow.height = 40;
    let logo = workbook.addImage({
      base64: Images.personal_blanco,
      extension: 'png',
    });
    imageRow.eachCell((cell, number)=> {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:{argb:'00D9186B'},
        bgColor:{argb:'00D9186B'}    
      };
    })
    worksheet.addImage(logo, 'E1:E1');
    //Se agregar titulo
    let titleRow = worksheet.addRow([title]);
    let subTitleRow = worksheet.addRow(['Fecha de generación : ' + datePipe.transform(new Date(), 'dd/MM/yyyy')]);
    titleRow.font = { name:'Calibri', size: 18, color: { argb: '00FFFFFF' }, bold: true}
    titleRow.height = 40;
    subTitleRow.font = { name:'Calibri', size: 12, color: { argb: '00FFFFFF' }}
    subTitleRow.height = 20;
    worksheet.mergeCells('A2:I2');
    worksheet.mergeCells('A3:I3');
    let cellTitle = worksheet.getCell('A2');
    cellTitle.alignment = { vertical: 'middle', horizontal: 'center' };
    cellTitle.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor:{argb:'00D9186B'},
      bgColor:{argb:'00D9186B'}    
    };  
    cellTitle.border = { bottom: { style:'thin', color: { argb: '00D9186B'}}}

    let cellSubTitle = worksheet.getCell('A3');
    cellSubTitle.alignment = { vertical: 'middle', horizontal: 'left' };
    cellSubTitle.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor:{argb:'00D9186B'},
      bgColor:{argb:'00D9186B'}    
    }; 

    //Hearders
    let headerRow = worksheet.addRow(headers);
    headerRow.height = 30;
    headerRow.eachCell((cell, number) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center'};
      cell.font = { name: 'Calibri', size: 14, color: { argb: '00FFFFFF'} }
      // cell.border = { left: { style:'thin', color: { argb: '00FFFFFF'}}, right: { style:'thin', color: { argb: '00FFFFFF'}}}
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:{argb:'00D9186B'},
        bgColor:{argb:'00D9186B'}    
      };
    });

    //Datos
    data.forEach( e => {
      let row = worksheet.addRow(e);
      row.eachCell((cell, number) => {
        cell.alignment = { wrapText: true };
        cell.font = { name: 'Calibri', size: 12, color: { argb: '00343A40'} }
      });
    });
    for (let i = 0; i < worksheet.columns.length; i += 1) { 
      worksheet.columns[i].width = 20;
    }
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'empleos.xlsx');
    });
  }
}
