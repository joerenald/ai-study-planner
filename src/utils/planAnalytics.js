export const buildAnalytics = (studyPlan) => {
  if (!studyPlan || studyPlan.length === 0) return null;

  // Bar chart → hours per day
  const hoursPerDay = studyPlan.map(item => ({
    day: item.day,
    hours: Number(item.studyHours)
  }));

  // Pie chart → hours per subject
  const subjectMap = {};
  studyPlan.forEach(item => {
    const hrs = Number(item.studyHours);
    if (!subjectMap[item.subject]) subjectMap[item.subject] = 0;
    subjectMap[item.subject] += hrs;
  });

  const subjectDistribution = Object.keys(subjectMap).map(sub => ({
    name: sub,
    value: subjectMap[sub]
  }));

  // Heatmap → daily intensity
  const today = new Date();
  const heatmap = studyPlan.map((item, i) => ({
    date: new Date(today.getTime() + i * 86400000)
      .toISOString()
      .split("T")[0],
    count: Number(item.studyHours)
  }));

  // Total hours
  const totalHours = studyPlan.reduce(
    (sum, item) => sum + Number(item.studyHours),
    0
  );

  return { hoursPerDay, subjectDistribution, heatmap, totalHours };
};
