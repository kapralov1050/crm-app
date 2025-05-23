export interface RootState {
  clients: Client[]
  deals: Deal[]
  searchResults: Deal[] | Client[],

}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: number | null;
  note?: string;
}

export interface Deal {
  id?: number;
  title: string;
  client: string;
  amount: number | null;
  status: status | null;
  deadline: number | null;
}

export type status = 'новая' | 'в работе' | 'успешно' | 'отменена'