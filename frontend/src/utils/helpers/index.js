export const passwordStrength = (password) => {
  if (!password) return "";
  if (password.length < 8) return "weak";
  if (
    password.length >= 8 &&
    password.match(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?=(?:\D*\d){2})(?=(?:[^!@#$%^&*()_+]*[!@#$%^&*()_+]){2}).+$/
    )
  )
    return "strong";
  return "medium";
};

export const normalizeData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => (typeof item === "string" ? item : item.label));
};

export const mainCategories = [
  [
    "Cosmetic and Aesthetic Procedures",
    "Dental Care",
    "Fertility Treatments",
    "Oncology",
    "Cardiovascular Treatments",
    "Orthopedic Treatments",
    "Ophthalmology clinic",
    "Weight loss service",
    "Neurology and Neurosurgery",
    "Urology clinic",
    "Dermatologist",
    "Ear, Nose, and Throat (ENT)",
    "Reproductive health clinic",
    "Geriatrician",
    "Pediatric clinic",
    "Chronic Disease Management",
    "Mental Health",
  ],
];

export const secondCategories = [
  {
    label: "Cosmetic and Aesthetic Procedures",
    value: "Cosmetic and Aesthetic Procedures",
  },
  {
    label: "Dental Care",
    value: "Dental Care",
  },
  {
    label: "Fertility Treatments",
    value: "Fertility Treatments",
  },
  {
    label: "Oncology",
    value: "Oncology",
  },
  {
    label: "Cardiovascular Treatments",
    value: "Cardiovascular Treatments",
  },
  {
    label: "Orthopedic Treatments",
    value: "Orthopedic Treatments",
  },
  {
    label: "Ophthalmology clinic",
    value: "Ophthalmology",
  },
  {
    label: "Weight loss Treatments",
    value: "Weight",
  },
  {
    label: "Neurology and Neurosurgery",
    value: "Neurology and Neurosurgery",
  },
  {
    label: "Urology clinic",
    value: "Urology",
  },
  {
    label: "Dermatologist",
    value: "Dermato",
  },
  {
    label: "Ear, Nose, and Throat (ENT)",
    value: "Ear",
  },
  {
    label: "Reproductive health clinic",
    value: "Reproductive health",
  },
  {
    label: "Geriatrician",
    value: "Geriatric",
  },
  {
    label: "Pediatric clinic",
    value: "Pediatric",
  },
  {
    label: "Chronic Disease Management",
    value: "Chronic Disease Management",
  },
  {
    label: "Mental Health",
    value: "Mental Health",
  },
];

export const isMainCategory = (category) =>
  mainCategories[0].includes(category);
