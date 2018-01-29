export default {
  // apiRoot: 'https://402.co.il/api/v1/',
  apiRoot: 'http://localhost:3005/api/v1/',
  resultsIndex: '402demo11',
  categoriesIndex: 'cat3',
  searchTabs: {
    people: {
      type: '1',
      route: 'ppls'
    },
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
      index: 'cat3'
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

