export interface LeaveSummaryResponse {
    status: number; // Corresponds to `int status` in Java
    recentLeaveRequest: LeaveRequest; // Corresponds to `LeaveRequest recentLeaveRequest`
    approvals: LeaveRequest[]; // Corresponds to `List<LeaveRequest> approvals`
  }
  
export interface LeaveRequest {
    id: string;
    employeeId: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    status: string;
    createdAt: Date;
    hrId: string;
    // Add other properties from your LeaveRequest model as needed
  }
  