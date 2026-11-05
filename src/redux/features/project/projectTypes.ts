import { ILocalizedString, UploadedImage } from "../service/serviceTypes";

export interface IProjectItem {
  _id: string;
  projectId: string;
  title: ILocalizedString;
  sector: ILocalizedString;
  sectorSlug: string;
  status: ILocalizedString;
  statusCode: "Ongoing" | "Completed" | "Planning";
  location: ILocalizedString;
  regionId: string;
  description: ILocalizedString;
  value: ILocalizedString;
  year: string;
  progress: number;
  image?: UploadedImage;
  isFlagship: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectListResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IProjectItem[];
}
