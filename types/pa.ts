export interface BasePaModel {
  id?: number
  persnum: number
  startDate: string
  endDate: string
  createTime?: string
  createUser?: string
  updateTime?: string
  updateUser?: string
}

export interface PaPersonal extends BasePaModel {
  name: string
  title?: string
  birthPlace: string
  birthDate: string
  gender: string
  maritalStatus: string
  maritalDate?: string
  religion: string
}

export interface PaAddress extends BasePaModel {
  subType: string
  street?: string
  city?: string
  region?: string
  postalCode?: string
  rt?: string
  rw?: string
  kelurahan?: string
  kecamatan?: string
}

export interface PaFamilyMember extends BasePaModel {
  subType: string
  number: number
  name: string
  birthPlace?: string
  birthDate?: string
  gender?: string
  birthFileName?: string
  maritalCertificate?: string
  maritalFileName?: string
  jobTitle?: string
  employer?: string
  bloodType?: string
  covered?: string
  coveredBy?: string
  coveredDate?: string
  divorceFileName?: string
  deathFileName?: string
  missingFileName?: string
  workingFileName?: string
  collegeFileName?: string
  employee?: string
  employeePersnum?: number
  bpjsKes?: string
  bpjsKesClass?: string
  bpjsKesFileName?: string
  bpjsFaskes1?: string
  bpjsFaskesGigi?: string
  insurance?: string
  insuranceName?: string
  phone?: string
  email?: string
  ktp?: string
  ktpFileName?: string
  photoFileName?: string
}

export interface PaEducation extends BasePaModel {
  subType: string
  institute?: string
  finalGrade?: number
  branchStudy?: string
  covered?: string
  entryDate?: string
  exitDate?: string
  certificateNumber?: string
  certificateDate?: string
  status?: string
  certificateFileName?: string
  transcriptFileName?: string
  adjustmentFileName?: string
  trainingName?: string
  trainingGrade?: string
}

export interface PaPersonalIds extends BasePaModel {
  subType: string
  number?: string
  author?: string
  issueDate?: string
  validDate?: string
  issuePlace?: string
  fileName?: string
}

export interface PaPreviousEmployer extends BasePaModel {
  employer?: string
  city?: string
  industry?: string
  job?: string
  workContract?: string
  position?: string
  area?: string
  certificateNumber?: string
  certificateDate?: string
  certificateFileName?: string
}

export interface PaTaxData extends BasePaModel {
  number?: string
  registrationDate?: string
  married?: string
  dependent?: string
  ptkp?: string
  fileName?: string
}

export interface PaBpjsKetenagakerjaan extends BasePaModel {
  number?: string
  married?: string
  terminate?: string
  fileName?: string
}

export interface PaObjectLoan extends BasePaModel {
  subType: string
  number: number
  unit: string
  objectNumber?: string
  notes?: string
}

export interface PaCommunication extends BasePaModel {
  subType: string
  number?: string
}

export interface RefLookup {
  field: string
  position: number
  code: string
  name: string
  active: string
}

export interface RefSubType {
  infoType?: string
  position?: number
  subType: string
  subTypeText?: string
  active?: string
}

export interface RefRegion {
  region: string
  regionText?: string
  active?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
