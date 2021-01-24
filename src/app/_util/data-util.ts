export class DataUtil {

    static applyFiltersToData(dataInput: any, filter: any, currentPage: number,
        pageSize: number, orderBy?: string, sort?: string): Response {

        const response = new Response();

        if (filter && Array.isArray(dataInput)) {
          const filterKeys = Object.keys(filter);

          const array = dataInput.filter(item => {
            return filterKeys.some((keyName) => {
              return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '';
            });
          });

          // sort array
        //   console.log(orderBy, sort);
          if (orderBy != null && orderBy.length > 0) {
            this.sortProduct(array, orderBy, sort);
          }

          response.data = array.slice((currentPage - 1) * pageSize, pageSize * currentPage);
          response.count = array.length;


          return response;
        }
      }

    static sortProduct<T>(array: any, propName: keyof any, order: string) {
        array.sort((a, b) => {
            if (a[propName] < b[propName]) {
                return -1;
            }
            if (a[propName] > b[propName]) {
                return 1;
            }
            return 0;
        });
        if (order === 'desc') {
            array.reverse();
        }
    }

}

class Response  {
    data: any;
    count: any;
  }


