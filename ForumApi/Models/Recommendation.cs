using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models{
    public class Recommendation{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string[] recommendations;

    }
}