export interface Task {
  id: number;
  title: string;
  description?: string;
  user_id: string; // UUID from Supabase Auth
  created_at?: string;
}

export interface TaskFormData {
  id?: number;
  title: string;
  description: string;
}
