import { Organization } from './organization';

export interface Practitioner {
  id: number;
  active: boolean;
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  address: string;
  phone: string;
  email: string;
  qualification: string;
  identifier: string;
  organization: Organization;
}
