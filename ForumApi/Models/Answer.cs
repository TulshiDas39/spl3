using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Answer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string userId {get; set;}

        public string questionId {get; set;}

        public string Description { get; set; }

        public int ratings { get; set; }

        public long dateTime { get; set; }
    }
}