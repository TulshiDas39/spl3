using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Answer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserId {get; set;}

        public string QuestionId {get; set;}

        public string Description { get; set; }

        public int Ratings { get; set; }

        public long DateTime { get; set; }
    }
}