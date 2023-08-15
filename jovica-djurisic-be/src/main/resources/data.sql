-- Organizations
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (1,'Bartoletti', 1, '5036 Windler Vista Kerlukestad, NC 47329-8088', '', '', 'OTHER');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (2,'Bashirian-Connelly', 1, '161 Hayes Junction Apt. 851 East Kiarra, MI 09428-3619', '', '', 'HOSPITAL');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (3,'Dicki Ltd', 1, '', 'della31@gmail.com', '1-605-535-9913x994', 'HOSPITAL');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (4,'Heller', 1, '', 'treutel.bradford@hotmail.com', '', 'CLINICAL_RESEARCH');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (5,'Klein-Schiller', 1, '13320 Kaleigh Way Suite 454 Port Mariomouth, UT 01057-6120', '', '1-057-179-8368x231', 'OTHER');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (6,'Lubowitz', 1, '626 Emard Prairie Suite 563 McCulloughfurt, DC 16319-4476', 'gkunde@yahoo.com', '005.975.6496x135', 'INSURANCE_COMPANY');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (7,'Mayer', 1, '478 Vandervort Oval Suite 615 South Johathan, PA 01431', '', '(046)310-4066x4707', 'HOSPITAL');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (8,'Swift', 1, '5858 Schuster Wells Suite 676 Blickberg, NJ 08639-3849', 'lesch.dallas@hotmail.com', '', 'CLINICAL_RESEARCH');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (9,'Wilderman', 1, '', '', '', 'EDUCATIONAL_INSTITUTE');
INSERT INTO `organizations` (`id`,`name`, `active`, `address`, `email`, `phone`, `type`) VALUES (10,'Wyman Group', 1, '37613 Kendra Mountains Apt. 298 Mantemouth, NM 79494', 'osborne13@yahoo.com', '1-072-215-2873x64167', 'EDUCATIONAL_INSTITUTE');


-- Service Types
INSERT INTO `service_type` (`id`,`name`) VALUES (1,'Aged Care Assesment');
INSERT INTO `service_type` (`id`,`name`) VALUES (2,'Aged Residential Assesment');
INSERT INTO `service_type` (`id`,`name`) VALUES (3,'Home Care/Housekeeping Assistance');
INSERT INTO `service_type` (`id`,`name`) VALUES (4,'Acupuncture');
INSERT INTO `service_type` (`id`,`name`) VALUES (5,'Bowen Therapy');
INSERT INTO `service_type` (`id`,`name`) VALUES (6,'Blood Donation');
INSERT INTO `service_type` (`id`,`name`) VALUES (7,'Family Planning');
INSERT INTO `service_type` (`id`,`name`) VALUES (8,'Immunization');
INSERT INTO `service_type` (`id`,`name`) VALUES (9,'Optometry');
INSERT INTO `service_type` (`id`,`name`) VALUES (10,'Osteopathy');
INSERT INTO `service_type` (`id`,`name`) VALUES (11,'Physiotherapy');
INSERT INTO `service_type` (`id`,`name`) VALUES (12,'Podiatry');
INSERT INTO `service_type` (`id`,`name`) VALUES (13,'Endodontic');
INSERT INTO `service_type` (`id`,`name`) VALUES (14,'Dental');
INSERT INTO `service_type` (`id`,`name`) VALUES (15,'Oral Surgery');
INSERT INTO `service_type` (`id`,`name`) VALUES (16,'Emergency Medical');
INSERT INTO `service_type` (`id`,`name`) VALUES (17,'Psychology');
INSERT INTO `service_type` (`id`,`name`) VALUES (18,'Dermatology');


-- Practitioners
INSERT INTO `practitioners` (`id`, `active`, `address`, `birth_date`, `email`, `gender`, `name`, `phone`, `qualification`, `surname`, `organization_id`) VALUES (181, 1, '9409 Cassie Camp East Wilburnburgh, VT 96231', '1982-05-24 00:00:00.000000', 'norbert15@yahoo.com', 'OTHER', 'Marge', '389.651.8494', 'CERTIFIED_NURSE_MIDWIFE', 'Lakin', 1);
INSERT INTO `practitioners` (`id`, `active`, `address`, `birth_date`, `email`, `gender`, `name`, `phone`, `qualification`, `surname`, `organization_id`) VALUES (182, 1, '9361 Ferry Dale Apt. 975 South Cynthia, MS 40438', '1982-05-24 00:00:00.000000', 'schmeler.mathias@gmail.com', 'MALE', 'Mariela', '1-993-404-2729', 'DOCTOR_OF_MEDICINE', 'Balistreri', 2);
INSERT INTO `practitioners` (`id`, `active`, `address`, `birth_date`, `email`, `gender`, `name`, `phone`, `qualification`, `surname`, `organization_id`) VALUES (183, 1, '735 Mitchell Extension North Ressiefort, SC 71203-9629', '1982-05-24 00:00:00.000000', 'linnie46@gmail.com', 'OTHER', 'Colt', '1-737-734-1795', 'DOCTOR_OF_MEDICINE', 'Kutch', 2);


-- Patients
INSERT INTO `patients` (`id`, `active`, `address`, `birth_date`, `deceased`, `email`, `gender`, `marital_status`, `name`, `phone`, `surname`, `organization_id`, `primary_care_provider_id`) VALUES ('1', 1, '654 Torp Rest Apt. 471 Lake Sincere, UT 78839', '2003-01-08 00:00:00.000000', 1, 'tschowalter@hotmail.com', 'FEMALE', 'DIVORCED', 'Alvina', '695-912-6815x7729', 'Turner', 1, 181);
INSERT INTO `patients` (`id`, `active`, `address`, `birth_date`, `deceased`, `email`, `gender`, `marital_status`, `name`, `phone`, `surname`, `organization_id`, `primary_care_provider_id`) VALUES ('2', 1, '46279 Romaguera Stravenue Apt. 856 Kutchfort, OR 22567', '2001-01-08 00:00:00.000000', 0, 'cmarquardt@hotmail.com', 'OTHER', 'MARRIED', 'Cory', '649-058-2944', 'Little', 2, 182);


# -- Examination
INSERT INTO `examinations` (`id`, `diagnosis`, `end_date`, `priority`, `start_date`, `status`, `organization_id`, `service_type_id`, `patient_id`) VALUES (1, 'Omnis culpa omnis unde assumenda.', '1997-10-28 02:00:00.000000', 'RUSH_REPORTING', '1997-10-28 01:00:00.000000', 'PLANNED', 5, 1, 2);
INSERT INTO `examinations` (`id`, `diagnosis`, `end_date`, `priority`, `start_date`, `status`, `organization_id`, `service_type_id`, `patient_id`) VALUES (2, 'Totam laudantium sapiente voluptatem expedita repellendus.', '2021-10-28 03:00:00.000000', 'ASAP', '2021-10-28 01:00:00.000000', 'IN_PROGRESS', 1, 2, 1);
INSERT INTO `examinations` (`id`, `diagnosis`, `end_date`, `priority`, `start_date`, `status`, `organization_id`, `service_type_id`, `patient_id`) VALUES (3, 'Consequuntur et natus autem.', '2022-04-28 13:00:00.000000', 'EMERGENCY', '2022-04-28 12:00:00.000000', 'FINISHED', 1, 3, 2);


# -- Examination_practitioners
INSERT INTO `examinations_practitioners` (`examination_id`, `practitioner_id`) VALUES (2, 182);
INSERT INTO `examinations_practitioners` (`examination_id`, `practitioner_id`) VALUES (3,183);

# -- Users
INSERT INTO `my_user` (id, password, username) VALUES (1,'admin', 'admin');
INSERT INTO `my_user` (id, password, username) VALUES (2,'user', 'user');
