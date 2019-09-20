using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string AuthId { get; set; }

        public string Name { get; set; }

        public string Tags { get; set; }

        public int Reputation { get; set; }

        public string Location { get; set; }
    }
}