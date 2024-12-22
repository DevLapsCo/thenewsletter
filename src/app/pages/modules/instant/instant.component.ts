import { Component, inject, OnInit, signal } from '@angular/core';
import { TemplatesMiniComponent } from "./components/templates-mini/templates-mini.component";
import { EditorViewerComponent } from "../../../shared/editor-viewer/editor-viewer.component";
import { GroupsMiniComponent } from "../../../shared/groups-mini/groups-mini.component";
import { NavBarDashboardComponent } from "../../components/dashboard-components/nav-bar/nav-bar.component";
import { MatDialog } from '@angular/material/dialog';
import { CalendarSchedulerComponent } from './dialogs/calendar-scheduler/calendar-scheduler.component';
import { CommonModule } from '@angular/common';
import { ContactGroupService } from '../../../services/groups/groups.service';
import { SendEmailsV2Service } from '../../../services/send-email-v2/send-emails-v2.service';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-instant',
  standalone: true,
  imports: [TemplatesMiniComponent,  MatProgressBarModule,CommonModule, EditorViewerComponent, GroupsMiniComponent, NavBarDashboardComponent],
  templateUrl: './instant.component.html',
  styleUrl: './instant.component.css'
})
export class InstantComponent implements OnInit{

  selectedTemplate : any;
  selectedTime : any;
  sendEmail = signal(false)

  dialog = inject(MatDialog)
  router = inject(Router)
  sendEmailV2Service = inject(SendEmailsV2Service)

  groupId! : string;

  emitSelectedTemplate(template : any){
    this.selectedTemplate = template;
  }

  ngOnInit(): void {
    
  }


  openCalendarScheduler(){
    const dialogRef = this.dialog.open(CalendarSchedulerComponent)

    dialogRef.afterClosed().subscribe({
      next: (n:  any) => {
        this.selectedTime = n
      }
    })
  }

  getGroupId(groupI : string){
    this.groupId = groupI
  }

  decidingEmailTypeSending(){
    if(this.selectedTime != null){
      this.sendTheEmailWithSchedule();
    } else {
      this.sendTheEmailWithoutScheduling()
    }
  }

  sendTheEmailWithSchedule(){
    var payload = {
      templateId: this.selectedTemplate.id,
      groupId: this.groupId,
      scheduledTime: this.selectedTime
    }

    this.sendEmail.set(true);
    
    this.sendEmailV2Service.scheduleEmail(payload.templateId ,payload.groupId, this.selectedTime).subscribe({
      next: (n : any) => {
        this.sendEmail.set(false);
        this.router.navigate(['/dashboard'])
      },
      error: (e : any) => {
        this.sendEmail.set(false);
      }
    })
  }
  
  sendTheEmailWithoutScheduling(){
    var payload = {
      templateId: this.selectedTemplate.id,
      groupId: this.groupId
    }
    this.sendEmail.set(true);
    
    this.sendEmailV2Service.quickSend(payload.templateId ,payload.groupId).subscribe({
      next: (n : any) => {
        this.sendEmail.set(false);
        this.router.navigate(['/dashboard'])
      }, 
      error: (e : any) => {
        this.sendEmail.set(false);
      }
    })
  }

}
