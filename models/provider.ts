export interface IProvider{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: IAddress;
  providerType: EProviderType;
  companyName: string;
  taxNumber: string;
  representativeName: string;
}


export interface IAddress{
  id: string;
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
}

export enum EProviderType{
  INDIVIDUAL = "individual",
  COMPANY = "company",
}