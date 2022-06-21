const admin = require("firebase-admin");
admin.initializeApp();

const followerCount = require("./followerCount");
const algoliaSearch = require("./algoliaSearch");
const savedLinksCount = require("./savedLinksCount");
const analytics = require("./analytics");
const user = require("./user");

module.exports = {
  registerUser: user.register,
  removeSubscriber: followerCount.remove,
  addSubscriber: followerCount.add,
  addToIndex: algoliaSearch.addToIndex,
  deleteFromIndex: algoliaSearch.deleteFromIndex,
  updateIndex: algoliaSearch.updateIndex,
  incrementSavedLinkCount: savedLinksCount.add,
  reduceSavedLinkCount: savedLinksCount.remove,
  processAnalytics: analytics.process,
};
