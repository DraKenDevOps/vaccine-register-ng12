export interface Province {
    id_province: number;
    name_lao: string;
}

export interface District {
    id_district: number;

    name_lao: string;
}

export interface Vaccines {
    id_vaccine_type: number;
    name: string;
    company: string;
    country: string;
    status: string;
}
export interface Location {
    id_location: number;
    location_code: string;
    name_la: string;
    status: number;
    per_hr_capacity: number;
    per_day_capacity: number;
    active_start_date: Date;
    active_end_date: Date;
}
export interface Job {
    job_id: number;
    job_name: string;
}
export interface Village {
    id_district: number;
    id_village: number;
    name_lao: string;
}

export interface Countries {
    name: string;
}
export interface target {
    id: number;
    name: string;
    isselected: boolean;
}
export interface webstatus {
    website_status: string;
}
