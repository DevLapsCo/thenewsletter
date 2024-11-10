
export interface Memo {
  id: string; // UUID as a string
  title: string;
  staffId: string;
  companyId: string;
  description: string;
  memo: string; // TEXT field
  newMemo: boolean;
  vetted: boolean;
  approved: boolean;
  inProgress: boolean;
  tracking: boolean;
  status: MemoStatus;
  completed: boolean;
  assignTo: string[]; // Array of staff IDs or names
  reAssignTo: string[]; // Array of staff IDs or names
  requestedService: string;
  createdAt: string; // Use string if you're not using js-joda for date management
  updatedAt: string; // Use string if you're not using js-joda for date management
}

export interface MemoComment {
  id: string; // UUID as a string
  memoId: string; // ID of the associated memo
  companyId: string; // ID of the company
  staffId: string; // ID of the staff member making the comment
  comment: string; // The comment text
  attributeTo: string; // Could be used for additional attribution
  createdAt: Date; // Use string if you're not using js-joda for date management
  updatedAt: Date; // Use string if you're not using js-joda for date management
}


export enum MemoStatus {
    VETTING = "VETTING",
    APPROVAL = "APPROVAL",
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    TRACKING = "TRACKING",
    COMPLETED = "COMPLETED"
}
