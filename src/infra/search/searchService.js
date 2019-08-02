// import algoliasearch from 'algoliasearch/reactnative';
// import config from '/config';
// import { Logger } from '/infra/reporting';

// class SearchService {
//   constructor() {
//     this.client = algoliasearch(config.providers.algolia.appId, config.providers.algolia.apiKey);
//     this.index = this.client.initIndex(`${config.providers.algolia.indexPrefix}superset`);
//     this.neighborhoodsIndex = this.client.initIndex(`${config.providers.algolia.indexPrefix}neighborhoods`);
//     this.pagesIndex = this.client.initIndex(`${config.providers.algolia.indexPrefix}pages`);
//   }

//   async searchNeighborhoods(term, destinationTagName) {
//     try {
//       const options = {
//         query: term,
//         filters: `destinationTagNames: ${destinationTagName}`
//       };

//       const result = await this.neighborhoodsIndex.search(options);
//       return result;
//     } catch (err) {
//       Logger.error(`algolia neighborhoods search failed: ${err}`);
//       return {};
//     }
//   }

//   async searchPages(term, communityId) {
//     try {
//       const options = {
//         query: term,
//         filters: `communityId: ${communityId}`
//       };

//       const result = await this.pagesIndex.search(options);
//       return result;
//     } catch (err) {
//       Logger.error(`algolia pages search failed: ${err}`);
//       return {};
//     }
//   }

//   async search({ query, page, communityId, destinationTagName, typoTolerance, entityTypeFilter, singleEntityType }) {
//     const currentTimestamp = new Date().getTime();
//     try {
//       let filters = `(communityId: ${communityId} OR destinationTagNames: ${destinationTagName})`;
//       filters += ' AND NOT privacyType: "1"';
//       filters += ` AND (startTime < 0 OR startTime > ${currentTimestamp} OR endTime > ${currentTimestamp})`;
//       if (entityTypeFilter) {
//         filters += ` AND NOT entityType: ${entityTypeFilter}`;
//       }
//       if (singleEntityType) {
//         filters += ` AND entityType: "${singleEntityType}"`;
//       }

//       const options = {
//         query,
//         page,
//         filters,
//         typoTolerance
//       };

//       const result = await this.index.search(options);
//       return result;
//     } catch (err) {
//       Logger.error(`algolia search failed: ${err}`);
//       return {};
//     }
//   }
// }

// export default new SearchService();
