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

        public string description { get; set; }

        public int ratings { get; set; }

        public long datetime { get; set; }

        public bool isAccepted {get; set;}
    }
}