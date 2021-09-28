export interface Education {
  id?: string;
  name?: string;
  type?: string;
  uid?: string;
  institution?: string;
  location?: string;
  description?: string;
  hasDate?: boolean;
  startDate?: number;
  endDate?: number;
  current?: boolean;
  skills?: any[];
  link?: string;
  image?: string;
}
