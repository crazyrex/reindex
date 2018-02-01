import config from 'config';

export default {
  apiRoot:'https://dev.402.co.il',
  resultsIndex: '402demo11',
  categoriesIndex: 'cat1',
  searchTabs: {   
    businesses: {
      type: '2,3',
      route: 'cat'
    },
    1: 'people',
    2: 'businesses',
    3: 'businesses'
  },
  filtersTypes: {
    categories: {
      index: 'cat1'
    },
    cities: {
      index: '402autocomplete',
      type: 'cities',
      queryParam: 'city'
    },
    phone: {
      queryParam: 'phone'
    }
  },
  recaptcha: {
    key: '6LfNoRsUAAAAAKbOeiWoCVgbDoVe49gYcPWPI0hH'
  },
  beta: true,
  hierarchyFilters: {
    kashrut: {
      _id: 'AVviyJkZ-NGAJ2IZ8Edh',
      content: 'כשרות',
      _type: 'A'
    }
  }
};

