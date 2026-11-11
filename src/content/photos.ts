/**
 * Photos for /photography. Put image files in public/photos/ and add them
 * here, newest first, e.g.
 *   { file: "istanbul-market.jpg", alt: "Spice stalls in a covered market", place: "Istanbul", year: 2025 }
 */
export type Photo = { file: string; alt: string; place?: string; year?: number };

export const photos: Photo[] = [];
