export interface ILocalizedString {
  en: string;
  ar: string;
}

export interface ILocalizedArray {
  en: string[];
  ar: string[];
}

export type UploadedImage =
  | string
  | { url?: string; public_id?: string }
  | null;

export interface IServiceSubDiscipline {
  id: string;
  tabTitle: ILocalizedString;
  heading: ILocalizedString;
  description: ILocalizedString;
  capabilitiesHeading?: ILocalizedString;
  capabilities?: ILocalizedArray;
  icon?: string;
}

export interface IServiceCatalogItem {
  id: string;
  title: ILocalizedString;
  description: ILocalizedString;
  image?: UploadedImage;
  badge?: ILocalizedString;
}

export interface IServiceItem {
  _id: string;
  slug: string;
  number: string;
  name: ILocalizedString;
  shortTitle: ILocalizedString;
  heading: ILocalizedString;
  description: ILocalizedString;
  image?: UploadedImage;
  icon: string;
  tabHeading?: ILocalizedString;
  coreCapabilitiesHeading?: ILocalizedString;
  coreDescription?: ILocalizedString;
  coreCapabilities?: ILocalizedArray;
  catalogHeading?: ILocalizedString;
  subDisciplines: IServiceSubDiscipline[];
  catalogItems: IServiceCatalogItem[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IServiceListResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IServiceItem[];
}
