// utils/profileCompletion.js

export const calculateProfileCompletion = (candidate) => {
  let completion = 0;

  // Personal Information (30% total)
  if (candidate.phone) completion += 10;
  if (candidate.rollNo) completion += 10;
  if (candidate.branch) completion += 10;

  // Education (30% total)
  if (candidate.education?.year) completion += 15;
  if (candidate.education?.cgpa) completion += 15;

  // Resume (40% total)
  if (candidate.resumeUrl) completion += 40;

  return completion;
};
