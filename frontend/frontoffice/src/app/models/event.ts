export interface Event {
    event_id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    max_participants: number;
    participants: {
      member_id: number;
      member_name: string;
    }[];
  }
  