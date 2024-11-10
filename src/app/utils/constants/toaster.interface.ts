export interface ToastrMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface NotificationMessage {
  type: 'CHAT' | 'EMAIL' | 'REQUEST';
  message: string;
  title: string;
  department : string;
  seen: boolean;
}
