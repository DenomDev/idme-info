export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  description?: string;
  username?: string;
  bgURL?: string;

  contactEmail?: string;
  contactPhone?: string;
  birthday?: number;
  location?: string;
  experiences?: any[];
  educations?: any[];
  skills?: any[];
  specializations?: any[];
  services?: any[];
  languages?: any[];
  links?: any[];
}
