using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ForumApi.Models
{
    public class IUserCredential
    {
        public string email;
        public string family_name;
        public string given_name;
        public string locale;
        public string name;
        public string nickname;
        public string picture;
        public string sub;
        public string updated_at;
    }
}