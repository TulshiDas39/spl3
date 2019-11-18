using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class TagItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public int users { get; set; }

    }
}