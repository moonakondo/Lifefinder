export const cities = [
  { label: "Istanbul", value: "Istanbul" },
  { label: "Bangkok", value: "Bangkok" },
  { label: "Miami", value: "Miami" },
  { label: "Riyadh", value: "Riyadh" },
  { label: "Dubai", value: "Dubai" },
  { label: "Mexico", value: "Mexico" },
  { label: "Sao Paulo", value: "São Paulo" },
  { label: "Rio De Janeiro", value: "Rio De Janeiro" },
  { label: "Shanghai", value: "Shanghai" },
  { label: "Seoul", value: "Seoul" },
];

export const sortingOptions = [
  { value: "average_rating", label: "Our Top Clinics" },
  { value: "price_asc", label: "Price (Lowest first)" },
  { value: "best_review_low_price", label: "Best reviewed & lowest price" },
  { value: "rating_desc", label: "Clinic rating (High to low)" },
  { value: "rating_asc", label: "Clinic rating (Low to high)" },
];

export const ratingData = [
  {
    title: "1 stars",
    rating: 1,
  },
  {
    title: "2 stars",
    rating: 2,
  },
  {
    title: "3 stars",
    rating: 3,
  },
  {
    title: "4 stars",
    rating: 4,
  },
  {
    title: "5 stars",
    rating: 5,
  },
  {
    title: "All Ratings",
    rating: "reset",
  },
];

export const childCategory2 = [
  {
    label: "Plastic Surgery",
    value: "Plastic Surgery",
    relate: "Cosmetic and Aesthetic Procedures",
  },
  {
    label: "Aesthetics",
    value: "Aesthetics",
    relate: "Cosmetic and Aesthetic Procedures",
  },
  {
    label: "Hair Transplant",
    value: "Hair Transplant",
    relate: "Cosmetic and Aesthetic Procedures",
  },
  {
    label: "General Dentistry",
    value: "General Dentistry",
    relate: "Dental Care",
  },
  {
    label: "Cosmetic Dentistry",
    value: "Cosmetic Dentistry",
    relate: "Dental Care",
  },
  {
    label: "Dental Surgery",
    value: "Dental Surgery",
    relate: "Dental Care",
  },
  {
    label: "Orthodontics",
    value: "Orthodontics",
    relate: "Dental Care",
  },
  {
    label: "Fertility Clinic",
    value: "Fertility Clinic",
    relate: "Fertility Treatments",
  },
  {
    label: "Surrogacy",
    value: "Surrogacy",
    relate: "Fertility Treatments",
  },
  {
    label: "Cardiology",
    value: "Cardiology",
    relate: "Cardiovascular Treatments",
  },
  {
    label: "Oncology for Men",
    value: "Oncology for Men",
    relate: "Oncology",
  },
  {
    label: "Oncology for Women",
    value: "Oncology for Women",
    relate: "Oncology",
  },
  {
    label: "General Oncology",
    value: "General Oncology",
    relate: "Oncology",
  },
  {
    label: "Orthopedics",
    value: "Orthopedics",
    relate: "Orthopedic Treatments",
  },
  {
    label: "Eye Surgery",
    value: "Eye Surgery",
    relate: "Ophthalmology",
  },
  {
    label: "Bariatric Surgery",
    value: "Bariatric Surgery",
    relate: "Weight Loss Treatments",
  },
  {
    label: "Neurology",
    value: "Neurology",
    relate: "Neurology and Neurosurgery",
  },
  {
    label: "Neurosurgery",
    value: "Neurosurgery",
    relate: "Neurology and Neurosurgery",
  },
  {
    label: "Urology",
    value: "Urology",
    relate: "Urology",
  },
  {
    label: "Dermatology",
    value: "Dermatology",
    relate: "Dermatology",
  },
  {
    label: "ENT",
    value: "ENT",
    relate: "Ear, Nose, and Throat (ENT)",
  },
  {
    label: "Gynecology",
    value: "Gynecology",
    relate: "Reproductive Health",
  },
  {
    label: "Andrology",
    value: "Andrology",
    relate: "Reproductive Health",
  },
  {
    label: "Geriatrics",
    value: "Geriatrics",
    relate: "Geriatric Care",
  },
  {
    label: "Pediatrics",
    value: "Pediatrics",
    relate: "Pediatric Care",
  },
  {
    label: "Diabetes Management",
    value: "Diabetes Management",
    relate: "Chronic Disease Management",
  },
  {
    label: "Pulmonology",
    value: "Pulmonology",
    relate: "Chronic Disease Management",
  },
  {
    label: "Psychiatry",
    value: "Psychiatry",
    relate: "Mental Health",
  },
  {
    label: "Psychology",
    value: "Psychology",
    relate: "Mental Health",
  },
];

export const services = [
  {
    service: ["Rhinoplasty", "Breast Augmentation", "Liposuction", "Facelifts"],
    relate: "Plastic Surgery",
  },
  {
    service: [
      "Botox",
      "Dermal Fillers",
      "Skin Rejuvenation",
      "Laser Treatments",
    ],
    relate: "Aesthetics",
  },
  {
    service: [
      "Follicular Unit Extraction (FUE)",
      "Follicular Unit Transplantation (FUT)",
      "Scalp Micropigmentation",
    ],
    relate: "Hair Transplant",
  },
  {
    service: [
      "Follicular Unit Extraction (FUE)",
      "Follicular Unit Transplantation (FUT)",
      "Scalp Micropigmentation",
    ],
    relate: "Hair Transplant",
  },
  {
    service: ["Cleanings", "Fillings"],
    relate: "General Dentistry",
  },
  {
    service: ["Veneers", "Teeth Whitening"],
    relate: "Cosmetic Dentistry",
  },
  {
    service: ["Implants", "Extractions"],
    relate: "Dental Surgery",
  },
  {
    service: ["Braces", "Extractions"],
    relate: "Orthodontics",
  },
  {
    service: [
      "In Vitro Fertilization (IVF)",
      "Intrauterine Insemination (IUI)",
    ],
    relate: "Fertility Clinic",
  },
  {
    service: ["Gestational Surrogacy", "Traditional Surrogacy"],
    relate: "Surrogacy",
  },
  {
    service: [
      "Angioplasty",
      "Bypass Surgery",
      "Valve Replacement",
      "Pacemaker Implantation",
    ],
    relate: "Cardiology",
  },
  {
    service: ["Prostate Cancer Treatment", "Testicular Cancer Treatment"],
    relate: "Oncology for Men",
  },
  {
    service: ["Breast Cancer Treatment", "Ovarian Cancer Treatment"],
    relate: "Oncology for Women",
  },
  {
    service: [
      "Chemotherapy",
      "Radiation Therapy",
      "Immunotherapy",
      " Surgical Oncology",
    ],
    relate: "General Oncology",
  },
  {
    service: [
      "Knee Replacement",
      "Hip Replacement",
      "Spinal Surgery",
      "Arthroscopy",
    ],
    relate: "Orthopedics",
  },
  {
    service: ["LASIK", "Cataract Surgery", "Glaucoma Treatment"],
    relate: "Eye Surgery",
  },
  {
    service: ["Gastric Bypass", "Gastric Sleeve", "Lap Band Surgery"],
    relate: "Bariatric Surgery",
  },
  {
    service: [
      "Epilepsy Treatment",
      "Parkinson's Treatment",
      "Lap Band Surgery",
    ],
    relate: "Neurology",
  },
  {
    service: ["Brain Tumor Surgery", "Spinal Cord Surgery"],
    relate: "Neurosurgery",
  },
  {
    service: [
      "Kidney Stone Removal",
      "Prostate Surgery",
      "Male Infertility Treatment",
    ],
    relate: "Urology",
  },
  {
    service: ["Acne Treatment", "Psoriasis Treatment", "Skin Cancer Treatment"],
    relate: "Dermatology",
  },
  {
    service: ["Sinus Surgery", "Tonsillectomy", " Cochlear Implants"],
    relate: "ENT",
  },
  {
    service: ["Hysterectomy", "Fibroid Removal", " Cochlear Implants"],
    relate: "Gynecology",
  },
  {
    service: ["Erectile Dysfunction Treatment", "Vasectomy"],
    relate: "Andrology",
  },
  {
    service: ["Hip Fracture Treatment", "Arthritis Management"],
    relate: "Geriatrics",
  },
  {
    service: ["Pediatric Surgery", "Neonatal Care"],
    relate: "Pediatrics",
  },
  {
    service: ["Insulin Pump Therapy"],
    relate: "Diabetes Management",
  },
  {
    service: ["Asthma Treatment", "COPD Management"],
    relate: "Pulmonology",
  },
  {
    service: ["Depression Treatment", "Anxiety Treatment"],
    relate: "Psychiatry",
  },
  {
    service: ["Cognitive Behavioral Therapy (CBT)", "Counseling"],
    relate: "Psychology",
  },
];

// Function to remove duplicate objects based on a key
const removeDuplicates = (array, key) => {
  return array.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  );
};

export const allCategeories = removeDuplicates(
  [
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
      value: "Fertility Treatments Hospitals",
    },
    {
      label: "Cardiovascular Treatments",
      value: "Cardiovascular Treatments",
    },
    {
      label: "Oncology",
      value: "Oncology Hospitals",
    },
    {
      label: "Orthopedic Treatments",
      value: "Orthopedic Treatments",
    },
    {
      label: "Ophthalmology",
      value: "Ophthalmology Hospitals",
    },
    {
      label: "Weight Loss Treatments",
      value: "Weight Loss Treatments",
    },
    {
      label: "Neurology and Neurosurgery",
      value: "Neurology and Neurosurgery Hospitals",
    },
    {
      label: "Urology",
      value: "Urology Hospitals",
    },
    {
      label: "Dermatology",
      value: "Dermatology Hospitals",
    },
    {
      label: "Ear, Nose, and Throat (ENT)",
      value: "Ear, Nose, and Throat (ENT) Hospitals",
    },
    {
      label: "Reproductive Health",
      value: "Reproductive Health Hospitals",
    },
    {
      label: "Geriatric Care",
      value: "Geriatric Care Hospitals",
    },
    {
      label: "Pediatric Care",
      value: "Pediatric Care Hospitals",
    },
    {
      label: "Chronic Disease Management",
      value: "Chronic Disease Management Hospitals",
    },
    {
      label: "Mental Health",
      value: "Mental Health  Hospital",
    },
    {
      label: "Plastic Surgery",
      value: "Plastic Surgery",
    },
    {
      label: "Aesthetics",
      value: "Aesthetics",
    },
    {
      label: "Hair Transplant",
      value: "Hair Transplant",
    },
    {
      label: "General Dentistry",
      value: "General Dentistry",
    },
    {
      label: "Cosmetic Dentistry",
      value: "Cosmetic Dentistry",
    },
    {
      label: "Dental Surgery",
      value: "Dental Surgery",
    },
    {
      label: "Orthodontics",
      value: "Orthodontics",
    },
    {
      label: "Fertility Clinic",
      value: "Fertility Clinic",
    },
    {
      label: "Surrogacy",
      value: "Surrogacy",
    },
    {
      label: "Cardiology",
      value: "Cardiology",
    },
    {
      label: "Oncology for Men",
      value: "Oncology for Men",
    },
    {
      label: "Oncology for Women",
      value: "Oncology for Women",
    },
    {
      label: "General Oncology",
      value: "General Oncology",
    },
    {
      label: "Orthopedics",
      value: "Orthopedics",
    },
    {
      label: "Eye Surgery",
      value: "Eye Surgery",
    },
    {
      label: "Bariatric Surgery",
      value: "Bariatric Surgery",
    },
    {
      label: "Neurology",
      value: "Neurology",
    },
    {
      label: "Neurosurgery",
      value: "Neurosurgery",
    },
    {
      label: "ENT",
      value: "ENT",
    },
    {
      label: "Gynecology",
      value: "Gynecology",
    },
    {
      label: "Andrology",
      value: "Andrology",
    },
    {
      label: "Geriatrics",
      value: "Geriatrics",
    },
    {
      label: "Pediatrics",
      value: "Pediatrics",
    },
    {
      label: "Diabetes Management",
      value: "Diabetes Management",
    },
    {
      label: "Pulmonology",
      value: "Pulmonology",
    },
    {
      label: "Psychiatry",
      value: "Psychiatry",
    },
    {
      label: "Psychology",
      value: "Psychology",
    },
    {
      label: "Rhinoplasty",
      value: "Rhinoplasty",
    },
    {
      label: "Breast Augmentation",
      value: "Breast Augmentation",
    },
    {
      label: "Liposuction",
      value: "Liposuction",
    },
    {
      label: "Facelifts",
      value: "Facelifts",
    },
    {
      label: "Botox",
      value: "Botox",
    },
    {
      label: "Dermal Fillers",
      value: "Dermal Fillers",
    },
    {
      label: "Skin Rejuvenation",
      value: "Skin Rejuvenation",
    },
    {
      label: "Laser Treatments",
      value: "Laser Treatments",
    },
    {
      label: "Follicular Unit Extraction (FUE)",
      value: "Follicular Unit Extraction (FUE)",
    },
    {
      label: "Follicular Unit Transplantation (FUT)",
      value: "Follicular Unit Transplantation (FUT)",
    },
    {
      label: "Scalp Micropigmentation",
      value: "Scalp Micropigmentation",
    },
    {
      label: "Cleanings",
      value: "Cleanings",
    },
    {
      label: "Fillings",
      value: "Fillings",
    },
    {
      label: "Veneers",
      value: "Veneers",
    },
    {
      label: "Teeth Whitening",
      value: "Teeth Whitening",
    },
    {
      label: "Implants",
      value: "Implants",
    },
    {
      label: "Extractions",
      value: "Extractions",
    },
    {
      label: "Braces",
      value: "Braces",
    },
    {
      label: "In Vitro Fertilization (IVF)",
      value: "In Vitro Fertilization (IVF)",
    },
    {
      label: "Intrauterine Insemination (IUI)",
      value: "Intrauterine Insemination (IUI)",
    },
    {
      label: "Gestational Surrogacy",
      value: "Gestational Surrogacy",
    },
    {
      label: "Traditional Surrogacy",
      value: "Traditional Surrogacy",
    },
    {
      label: "Angioplasty",
      value: "Angioplasty",
    },
    {
      label: "Bypass Surgery",
      value: "Bypass Surgery",
    },
    {
      label: "Valve Replacement",
      value: "Valve Replacement",
    },
    {
      label: "Pacemaker Implantation",
      value: "Pacemaker Implantation",
    },
    {
      label: "Prostate Cancer Treatment",
      value: "Prostate Cancer Treatment",
    },
    {
      label: "Testicular Cancer Treatment",
      value: "Testicular Cancer Treatment",
    },
    {
      label: "Breast Cancer Treatment",
      value: "Breast Cancer Treatment",
    },
    {
      label: "Ovarian Cancer Treatment",
      value: "Ovarian Cancer Treatment",
    },
    {
      label: "Chemotherapy",
      value: "Chemotherapy",
    },
    {
      label: "Radiation Therapy",
      value: "Radiation Therapy",
    },
    {
      label: "Immunotherapy",
      value: "Immunotherapy",
    },
    {
      label: "Surgical Oncology",
      value: "Surgical Oncology",
    },
    {
      label: "Knee Replacement",
      value: "Knee Replacement",
    },
    {
      label: "Hip Replacement",
      value: "Hip Replacement",
    },
    {
      label: "Spinal Surgery",
      value: "Spinal Surgery",
    },
    {
      label: "Arthroscopy",
      value: "Arthroscopy",
    },
    {
      label: "LASIK",
      value: "LASIK",
    },
    {
      label: "Cataract Surgery",
      value: "Cataract Surgery",
    },
    {
      label: "Glaucoma Treatment",
      value: "Glaucoma Treatment",
    },
    {
      label: "Gastric Bypass",
      value: "Gastric Bypass",
    },
    {
      label: "Gastric Sleeve",
      value: "Gastric Sleeve",
    },
    {
      label: "Lap Band Surgery",
      value: "Lap Band Surgery",
    },
    {
      label: "Epilepsy Treatment",
      value: "Epilepsy Treatment",
    },
    {
      label: "Parkinson's Treatment",
      value: "Parkinson's Treatment",
    },
    {
      label: "Brain Tumor Surgery",
      value: "Brain Tumor Surgery",
    },
    {
      label: "Spinal Cord Surgery",
      value: "Spinal Cord Surgery",
    },
    {
      label: "Kidney Stone Removal",
      value: "Kidney Stone Removal",
    },
    {
      label: "Prostate Surgery",
      value: "Prostate Surgery",
    },
    {
      label: "Male Infertility Treatment",
      value: "Male Infertility Treatment",
    },
    {
      label: "Acne Treatment",
      value: "Acne Treatment",
    },
    {
      label: "Psoriasis Treatment",
      value: "Psoriasis Treatment",
    },
    {
      label: "Skin Cancer Treatment",
      value: "Skin Cancer Treatment",
    },
    {
      label: "Sinus Surgery",
      value: "Sinus Surgery",
    },
    {
      label: "Tonsillectomy",
      value: "Tonsillectomy",
    },
    {
      label: "Cochlear Implants",
      value: "Cochlear Implants",
    },
    {
      label: "Hysterectomy",
      value: "Hysterectomy",
    },
    {
      label: "Fibroid Removal",
      value: "Fibroid Removal",
    },
    {
      label: "Erectile Dysfunction Treatment",
      value: "Erectile Dysfunction Treatment",
    },
    {
      label: "Vasectomy",
      value: "Vasectomy",
    },
    {
      label: "Hip Fracture Treatment",
      value: "Hip Fracture Treatment",
    },
    {
      label: "Arthritis Management",
      value: "Arthritis Management",
    },
    {
      label: "Pediatric Surgery",
      value: "Pediatric Surgery",
    },
    {
      label: "Neonatal Care",
      value: "Neonatal Care",
    },
    {
      label: "Insulin Pump Therapy",
      value: "Insulin Pump Therapy",
    },
    {
      label: "Asthma Treatment",
      value: "Asthma Treatment",
    },
    {
      label: "COPD Management",
      value: "COPD Management",
    },
    {
      label: "Depression Treatment",
      value: "Depression Treatment",
    },
    {
      label: "Anxiety Treatment",
      value: "Anxiety Treatment",
    },
    {
      label: "Cognitive Behavioral Therapy (CBT)",
      value: "Cognitive Behavioral Therapy (CBT)",
    },
    {
      label: "Counseling",
      value: "Counseling",
    },
  ],
  "label"
);
