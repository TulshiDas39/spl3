using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Vote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string userId { get; set; }

        public bool isUpvote { get; set;}

        public string postId {get; set;}

        public string postType {get; set;}

    }
}