
/**
 * @tableInfo table information
 * @columnName which column should sort
 * @order whether asc or desc order
 * tableSorting method should return the sorting table based on user preferences.
 * */
export const tableSorting = (
  tableInfo: any,
  columnName: string,
  order: number
) => {
  tableInfo.sort((ele1: any, ele2: any) => {
    if (ele1[columnName] < ele2[columnName]) {
      return -1 * order;
    } else if (ele1[columnName] > ele2[columnName]) {
      return 1 * order;
    } else {
      return 0;
    }
  });
  return tableSorting;
};

/**
 * @value Table Information
 * @args  data
 * filterTable should filter the data based on the args given by the user.
 * */
export const filterTable = (value: any, args?: any) => {
  if (!value) return null;
  if (!args) return value;

  args = args.toLowerCase();

  value = value.filter(item => {
    return JSON.stringify(item)
      .toLowerCase()
      .includes(args);
  });
  return value;
};
