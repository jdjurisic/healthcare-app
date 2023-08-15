import { Organization } from './organization';
import { Practitioner } from './practitioner';

export interface Patient {
  id: number;
  active: boolean;
  name: string;
  surname: string;
  gender: string;
  birthDate: Date;
  address: string;
  phone: string;
  email: string;
  deceased: boolean;
  maritalStatus: string;
  organization: Organization;
  primaryCareProvider: Practitioner;
  identifier: string;
}
