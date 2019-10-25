using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string userId {get; set;}
        
        public string target {get; set;}

        public string targetId {get; set;}

        public string text { get; set; }

        public int ratings { get; set; }
        
        public string dateTime { get; set; }
    }
}