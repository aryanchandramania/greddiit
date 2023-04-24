const mongo_user = "channy";
const mongo_pass = "channy";
const db_name = 'greddiit_db';
const cluster_name = 'greddiit';

module.exports = {
    mongoURI: `mongodb+srv://${mongo_user}:${mongo_pass}@${cluster_name}.8ttxdzk.mongodb.net/${db_name}?retryWrites=true&w=majority` 
  };