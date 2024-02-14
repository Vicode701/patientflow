export const getDateString = () =>
{
  const today = new Date();
  const month = today.getMonth() + 1; 
  const day = today.getDate(); 
  const year = today.getFullYear(); 
  const formattedDate = month + '/' + day + '/' + year;

  return formattedDate;
}