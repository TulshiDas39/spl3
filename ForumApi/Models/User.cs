using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string userId { get; set; }

        public string name { get; set; }

        public string tags { get; set; }

        public int reputation { get; set; }

        public string location { get; set; }
    }
}