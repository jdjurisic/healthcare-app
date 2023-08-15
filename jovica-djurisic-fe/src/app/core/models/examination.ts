import { Organization } from './organization';
import { Patient } from './patient';
import { Practitioner } from './practitioner';
import { ServiceType } from './service-type';

export interface Examination {
  id: number;
  status: string;
  serviceType: ServiceType;
  priority: string;
  startDate: string;
  endDate: string;
  diagnosis: string;
  practitioners: Practitioner[];
  organization: Organization;
  patient: Patient;
  identifier: string;
}
