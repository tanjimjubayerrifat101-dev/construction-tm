import { ILocalizedArray, ILocalizedString } from "../service/serviceTypes";

export interface IJobPositionItem {
  _id: string;
  jobId: string;
  title: ILocalizedString;
  departmentId: string;
  department: ILocalizedString;
  location: ILocalizedString;
  type: ILocalizedString;
  experience: ILocalizedString;
  postedDate: string;
  icon: string;
  overview: ILocalizedString;
  responsibilities: ILocalizedArray;
  requirements: {
    education: ILocalizedArray;
    experience: ILocalizedArray;
    licensing: ILocalizedArray;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJobApplicationItem {
  _id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  currentCity: string;
  experience: string;
  noticePeriod: string;
  currentEmployer?: string;
  linkedin?: string;
  coverNote?: string;
  cv: {
    url: string;
    public_id?: string;
    filename?: string;
  };
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: string;
  updatedAt: string;
}

export interface IJobListResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IJobPositionItem[];
}

export interface IApplicationListResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IJobApplicationItem[];
}
