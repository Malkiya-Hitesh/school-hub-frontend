// lib/cloudinary.js
// Cloudinary direct upload helper
// Used for logo, cover image uploads from dashboard

const CLOUD_NAME   = "dmkl2vxed";
const UPLOAD_PRESET = "school_hub";
const UPLOAD_URL   = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Upload a file to Cloudinary
 * @param {File}   file      - File object from input
 * @param {string} schoolId  - MongoDB school _id (for folder structure)
 * @param {string} type      - "logo" | "cover" | "document" | "facility"
 * @returns {{ url, public_id, folder, provider }}
 */
export const uploadToCloudinary = async ({ file, schoolId, type }) => {
  if (!file) throw new Error("File is required");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Dynamic folder structure per school
  const folder = `school-hub/schools/${schoolId}/${type}`;
  formData.append("folder", folder);

  const res  = await fetch(UPLOAD_URL, { method: "POST", body: formData });
  const data = await res.json();

  if (!data.secure_url) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return {
    url:       data.secure_url,
    public_id: data.public_id,
    folder,
    provider:  "cloudinary",
  };
};