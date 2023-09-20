export type Staff = {
  id: number;
  email: string;
  name: string;
  staff_type_id: number;
  created_at?: string;
  updated_at?: string;
  password?: string;
  confirm_password?: string;
  rowNumber?: number;
};

export type User = {
  id: number;
  email?: string;
  phone_number?: string;
  name: string;
  staff_type_id?: number;
  is_archived?: number;
  is_verified?: number;
  allowed_table?: number;
  user_type_id?: number;
  balance?: number;
  new_balance?: number;
  point?: number;
  created_at?: string;
  updated_at?: string;
  exp?: string;
  iat?: string;
  jti?: string;
  sub?: string;
  token?: string;
  rowNumber?: number;
};

export type Set = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
};
export type Type = {
  id: number;
  name: string;
  allowed_people: string;
  is_available: number;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
};
export type Package = {
  id: number;
  name: string;
  photo: string;
  type_id: number;
  type: Type;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
};

export type PointItem = {
  id: number;
  photo: string;
  point: number;
  details: string;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
};

export type Event = {
  id: number;
  name: string;
  date: string;
  set_id: number;
  set: Set;
  walk_in_price: number;
  is_available: number;
  photo: string;
  layout_photo: string;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
  tables: Table[];
};

export type Table = {
  id: number;
  name: string;
  type_id: number;
  type: Type;
  price?: number;
  allowed_people?: number;
  packages?: Package[];
  booking_status?: string;
  event_table_id?: number;
  is_available: number;
  created_at?: string;
  updated_at?: string;
  rowNumber?: number;
};

export type SetPrice = {
  price: number;
  set_id: number;
  set_name: string;
};

export type TableSet = {
  table_count: number;
  type_id: number;
  type_name: string;
  set_prices: SetPrice[];
};

export type EventTable = {
  id: number;
  booking_status: string;
  event: Event;
  event_id: number;
  table: Table;
  table_id: number;
  price?:number;
};

export type Booking = {
  id: number;
  name?: string;
  phone_number?: string;
  use_balance: number;
  user?: User;
  user_id?: number;
  event_table: EventTable;
  event_table_id: number | undefined;
  note: string;
  photo?: string;
  booking_status?: string;
  price?: number;
  rowNumber?: number;
  created_at?: string;
  updated_at?: string;
  admin_note?: string;
};
