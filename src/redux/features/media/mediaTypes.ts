import { ILocalizedString, UploadedImage } from "../service/serviceTypes";

export interface IMediaPostItem {
  _id: string;
  slug: string;
  title: ILocalizedString;
  category: ILocalizedString;
  excerpt: ILocalizedString;
  body: ILocalizedString;
  image?: UploadedImage;
  date: string;
  author?: ILocalizedString;
  readTime?: ILocalizedString;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMediaListResponse {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: IMediaPostItem[];
}
