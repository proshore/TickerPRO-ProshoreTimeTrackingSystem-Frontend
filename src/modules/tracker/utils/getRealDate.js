export default function getSingleTotalDate(startDate, endDate) {
    const date = new Date(endDate) - new Date(startDate);
    return new Date(date);
  }