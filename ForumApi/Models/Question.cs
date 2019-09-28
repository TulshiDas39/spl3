using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Question
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Tags { get; set; }

        public int Ratings { get; set; }

        public long DateTime { get; set; }

        public int Views { get; set; }

        public bool IsAccepted { get; set; }
    }
}