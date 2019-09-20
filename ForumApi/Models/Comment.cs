using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserId {get; set;}
        
        public string Target {get; set;}

        public string TargetId {get; set;}

        public string Text { get; set; }

        public int Ratings { get; set; }
        
        public string DateTime { get; set; }
    }
}