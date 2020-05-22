import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models/tag';
import { TagService } from 'src/app/_services/tags.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(private apiTag: TagService, private toastr: ToastrService) { }

  tags: Tag[] = [];
  p: number = 1;
  itemspp: number = 10;

  tagEdit: Tag = new Tag();
  tagAdd: Tag = new Tag();
  tagDelete: Tag = new Tag();
  tagDeletePos = null;

  ngOnInit(): void {
    this.getTags();
    $('#add-color, #edit-color').colorpicker({useAlpha:false});
  }

  getTags(){
    this.apiTag.getTags().subscribe(
      data => {
        this.tags = data;
      }
    )
  }

  putTag(){ 
    let color = $('#edit-color').colorpicker('colorpicker').getValue();
    this.tagEdit.color = color;
    
    if(this.check(this.tagEdit)){
      this.apiTag.putTag(this.tagEdit.id, this.tagEdit).subscribe(
        data => {
          this.toastr.success("Tag modificado");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  postTag(){
    let color = $('#add-color').colorpicker('colorpicker').getValue();
    this.tagAdd.color = color;
    
    if(this.check(this.tagAdd)){
      this.apiTag.postTag(this.tagAdd).subscribe(
        data => {
          this.toastr.success("Tag agregado");
          this.tagAdd.id = data.id;
          this.tags.push(this.tagAdd);
          this.tagAdd = new Tag();
          $('#add-color').colorpicker('colorpicker').setValue("#000000");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
  }

  deleteTag(){
    this.apiTag.deleteTag(this.tagDelete.id).subscribe(
      data => {
        this.toastr.success("Tag eliminado");
        this.tags.splice(this.tagDeletePos, 1);
      }
    )
  }

  check (obj: Tag) {
    return obj.nombre != null && obj.nombre != "" &&
    obj.color != null && obj.color != "";
  }

  onPut(obj: Tag){
    $('#edit-color').colorpicker('colorpicker').setValue(obj.color);
    this.tagEdit = obj;
  }
}
