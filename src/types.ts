export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface FormData {
  advertiser: string;
  campaign: string;
  startDate: string;
  endDate: string;
  budget: string;
  geoType: string;
  geoValue: string;
  placements: string[];
  displaySizes: string[];
  clickUrl: string;
  reportEmail: string;
  ccName: string;
  ccNumber: string;
  ccExp: string;
  ccCvc: string;
  ccZip: string;
  creativeFiles: UploadedFile[];
}

export interface FormErrors {
  [key: string]: string;
}

export interface SubmittedPayload {
  advertiser: string;
  campaign: string;
  startDate: string;
  endDate: string;
  budget: number;
  targeting: {
    type: string;
    value: string;
  };
  placements: string[];
  displaySizes: string[];
  clickUrl: string;
  reportEmail: string;
  payment: {
    nameOnCard: string;
    cardBrand: string;
    cardLast4: string;
  };
  creativeFiles: {
    name: string;
    size: number;
    type: string;
  }[];
}

export interface Placement {
  key: string;
  label: string;
}
