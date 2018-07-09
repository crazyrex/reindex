'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	templateEngine: 'swig',
	version: 'v1',
	activeProvider: '',
	root: rootPath,
	categoriesFilters: ['kashrut'],
	hierarchyFilters: {
	  kashrut: {
		content: 'אוכל'
	  }
	},
	searchQuery: {
	  records: {
		default: {
		  match: ['tags.raw'],
		  regexp: ['reindexTitle']
		},
		notOnlyCategoriesFilter: {
		  match: ['reindexTitle'],
		  plain: ['reindexTitle']
		}
	  }
	},
	queues: [
	  // {
	  //   name: 'reindex-module',
	  //   maxUnackMessages: 5
	  // }
	],	
	schedules: [
	  // {
		// 	name: 'reindex-module',
		// 	cron: '0 0 0 * * * *'
	  // }
	],
	routes: [
		// {
		// 	module: 'reindex-module',
		// 	name: 'module'
		// }
	],
	inheritFunctions: {
	  // importRecords: 'reindex-import-module',
	},
};