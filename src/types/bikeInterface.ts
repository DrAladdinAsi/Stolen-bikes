export interface Bike {
    id: number;
    title: string;
    manufacturer_name: string;
    year: number;
    thumb: string | null;
    stolen_location: string;
    url: string;
    serial: string;
    date_stolen: number | null;
    stolen: boolean;
    frame_colors ?: string[];
  }