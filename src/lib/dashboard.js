import axiosInstance from "./axiosInstance";

export const dashboardApi = {
  // ── School ──────────────────────────────────────────────────
  getSchool:       ()   => axiosInstance.get("/dashboard/school"),
  getStats:        ()   => axiosInstance.get("/dashboard/stats"),
  registerSchool:  (d)  => axiosInstance.post("/dashboard/school/register", d),

  // ── Section patches ─────────────────────────────────────────
  updateBasics:    (d)  => axiosInstance.patch("/dashboard/school/basics",    d),
  updateAbout:     (d)  => axiosInstance.patch("/dashboard/school/about",     d),
  updateAddress:   (d)  => axiosInstance.patch("/dashboard/school/address",   d),
  updateAcademics: (d)  => axiosInstance.patch("/dashboard/school/academics", d),
  updateCategory:  (d)  => axiosInstance.patch("/dashboard/school/category",  d),
  updateAdmission: (d)  => axiosInstance.patch("/dashboard/school/admission", d),
  updateFees:      (d)  => axiosInstance.patch("/dashboard/school/fees",      d),
  updateContact:   (d)  => axiosInstance.patch("/dashboard/school/contact",   d),

  // NOTE: removed updateFacility()/getUdiseFacility() — that "UDISE
  // infrastructure" object (classrooms, toilets, electricity, computers…)
  // doesn't exist anywhere in the final School schema, so there was no
  // backend route/field for it to save to. Add it to the schema first if
  // you want that data captured.

  // ── Results (schema: classLabel/year/stream/board/medium/appeared/passed/passingRate/posterImageUrl) ──
  getResults:      ()       => axiosInstance.get("/dashboard/school/results"),
  addResult:       (d)      => axiosInstance.post("/dashboard/school/results", d),
  updateResult:    (id, d)  => axiosInstance.patch(`/dashboard/school/results/${id}`, d),
  deleteResult:    (id)     => axiosInstance.delete(`/dashboard/school/results/${id}`),

  // ── Achievements (schema: title/description/imgUrl/year) ─────
  getAchievements:    ()      => axiosInstance.get("/dashboard/school/achievements"),
  addAchievement:     (d)     => axiosInstance.post("/dashboard/school/achievements", d),
  updateAchievement:  (id, d) => axiosInstance.patch(`/dashboard/school/achievements/${id}`, d),
  deleteAchievement:  (id)    => axiosInstance.delete(`/dashboard/school/achievements/${id}`),

  // ── Facility Showcase (schema: facilities → label/description/imageUrl) ──
  getFacilityItems:    ()      => axiosInstance.get("/dashboard/school/facilities"),
  addFacilityItem:     (d)     => axiosInstance.post("/dashboard/school/facilities", d),
  updateFacilityItem:  (id, d) => axiosInstance.patch(`/dashboard/school/facilities/${id}`, d),
  deleteFacilityItem:  (id)    => axiosInstance.delete(`/dashboard/school/facilities/${id}`),

  // ── Social Links (schema: social → flat object, no wrapper key) ──
  // Backend validator reads req.body.facebook / .instagram / etc directly,
  // so send the flat object as-is — no {links: [...]} transform.
  getSocial:    ()  => axiosInstance.get("/dashboard/school/social"),
  updateSocial: (d) => axiosInstance.put("/dashboard/school/social", d),
};