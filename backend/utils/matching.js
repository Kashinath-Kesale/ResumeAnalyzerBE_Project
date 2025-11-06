// simple overlap match
export const computeMatchPercentage = (candidateKeywords = [], jobKeywords = []) => {
  if (!jobKeywords || jobKeywords.length === 0) return 0;
  if (!candidateKeywords || candidateKeywords.length === 0) return 0;

  const candSet = new Set(candidateKeywords.map(k => k.toLowerCase()));
  const common = jobKeywords.reduce((acc, k) => acc + (candSet.has(k.toLowerCase()) ? 1 : 0), 0);
  const percentage = Math.round((common / jobKeywords.length) * 100);
  return percentage;
};
