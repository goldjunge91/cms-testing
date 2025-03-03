import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Importiere den Typ OurFileRouter aus dem Core-Modul
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();