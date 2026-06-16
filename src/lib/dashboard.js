// lib/api/dashboard.js
// Complete dashboardApi — matches all routes in routes/dashboard.js
// Adjust the import path for axiosInstance to match your project

import axiosInstance from "./axiosInstance";

 // e.g. lib/axios.js or lib/api/index.js

export const dashboardApi = {

  // ── School ──────────────────────────────────────────────────
  getSchool:       ()   => axiosInstance.get("/dashboard/school"),
  getStats:        ()   => axiosInstance.get("/dashboard/stats"),
  registerSchool:  (d)  => axiosInstance.post("/dashboard/school/register", d),

  // ── Section patches ─────────────────────────────────────────
  updateBasics:    (d)  => axiosInstance.patch("/dashboard/school/basics",    d),
  updateAddress:   (d)  => axiosInstance.patch("/dashboard/school/address",   d),
  updateAcademics: (d)  => axiosInstance.patch("/dashboard/school/academics", d),
  updateCategory:  (d)  => axiosInstance.patch("/dashboard/school/category",  d),
  updateFees:      (d)  => axiosInstance.patch("/dashboard/school/fees",      d),
  updateContact:   (d)  => axiosInstance.patch("/dashboard/school/contact",   d),

  // ── UDISE / Infrastructure (facility object) ─────────────────
  // NOTE: add PATCH /dashboard/school/udise-facility to your backend (see below)
  updateFacility:  (d)  => axiosInstance.patch("/dashboard/school/udise-facility", d),
  getUdiseFacility: ()  => axiosInstance.get("/dashboard/school/udise-facility"),

  // ── Results ─────────────────────────────────────────────────
  getResults:      ()       => axiosInstance.get("/dashboard/school/results"),
  addResult:       (d)      => axiosInstance.post("/dashboard/school/results", d),
  updateResult:    (id, d)  => axiosInstance.patch(`/dashboard/school/results/${id}`, d),
  deleteResult:    (id)     => axiosInstance.delete(`/dashboard/school/results/${id}`),

  // ── Achievements ─────────────────────────────────────────────
  getAchievements:    ()      => axiosInstance.get("/dashboard/school/achievements"),
 addAchievement: (d) => {
  console.log("Adding achievement:", d);
  return axiosInstance.post("/dashboard/school/achievements", d);
},
  updateAchievement:  (id, d) => axiosInstance.patch(`/dashboard/school/achievements/${id}`, d),
  deleteAchievement:  (id)    => axiosInstance.delete(`/dashboard/school/achievements/${id}`),

  // ── Facility Showcase (school-uploaded items, NOT UDISE) ─────
  getFacilityItems:    ()      => axiosInstance.get("/dashboard/school/facilities"),
  addFacilityItem:     (d)     => axiosInstance.post("/dashboard/school/facilities", d),
  updateFacilityItem:  (id, d) => axiosInstance.patch(`/dashboard/school/facilities/${id}`, d),
  deleteFacilityItem:  (id)    => axiosInstance.delete(`/dashboard/school/facilities/${id}`),

  // ── Social Links ─────────────────────────────────────────────
  // The frontend sends { socialLinks: [...] } but backend expects { links: [...] }
  // Transform happens inside updateSocial so sections don't need to know
  getSocial: () => axiosInstance.get("/dashboard/school/social"),
  updateSocial: ({ socialLinks }) =>
    axiosInstance.put("/dashboard/school/social", { links: socialLinks }),
};