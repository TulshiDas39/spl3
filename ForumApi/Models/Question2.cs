using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Question2
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string userId { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public string tags { get; set; }

        public int ratings { get; set; }

        public long dateTime { get; set; }

        public int views { get; set; }

        public bool isAccepted { get; set; }
    }
}