import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {FormsModule} from '@angular/forms';
// import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-scheduler',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatDatepickerModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './calendar-scheduler.component.html',
  styleUrl: './calendar-scheduler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSchedulerComponent {

  constructor(public dialogRef: MatDialogRef<CalendarSchedulerComponent>) {}

  selectedDate: Date | null = null;
  selectedTime: string = '';

  submit() {
    if (this.selectedDate && this.selectedTime) {
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      const combinedDateTime = new Date(this.selectedDate);
      combinedDateTime.setHours(hours, minutes);

      const formattedDateTime = this.formatDateTime(combinedDateTime);

      // Send data back via the dialogRef.close method
      this.dialogRef.close(formattedDateTime);
    }
  }

  /**
   * Formats the Date object into `yyyy-MM-ddTHH:mm:ss.SSSS` format.
   */
  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(4, '0'); // 4 digits for milliseconds

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
