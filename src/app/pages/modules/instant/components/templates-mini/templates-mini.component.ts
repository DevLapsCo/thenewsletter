import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UserTemplatesService } from '../../../../../services/user-templates/user-templates.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templates-mini',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './templates-mini.component.html',
  styleUrl: './templates-mini.component.css'
})
export class TemplatesMiniComponent implements OnInit{

  @Output() seletedTemplate : EventEmitter<any> = new EventEmitter()

  userTemplateService = inject(UserTemplatesService)

  allTemplate : any;
  searchKeyword! : string;

  ngOnInit(): void {
    this.getUserTemplates();
  }

  getUserTemplates(){
    const uid = sessionStorage.getItem("uid")

    if(uid != null){
      this.userTemplateService.getAllUserTemplates(uid).subscribe({
        next: (n : any) => {
          this.allTemplate = n
        }
      })
    }
  }

  sendTemplateToMiniEditor(template : any){
    this.seletedTemplate.emit(template);
  }

}
