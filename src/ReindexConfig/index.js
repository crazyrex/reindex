import config from 'config';

export default {
apiRoot: 'http://localhost:3005/api/v1/',
  categoriesIndex: 'reindex-categories',
  lang: "he",
  tabs:{
    activeSearchTab: true,
    activeMapTab: true
  },
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
      index: 'reindex-categories'
    },
    cities: {
      index: 'reindex-cities',
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

