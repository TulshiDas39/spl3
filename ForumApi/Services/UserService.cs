using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<User> Get() =>
            _users.Find(User => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(User => User.userId == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public bool Exist(string userId){
            if( Get(userId) == null ) return false;
            return true;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.id == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.id == userIn.id);

        public void Remove(string id) => 
            _users.DeleteOne(user => user.id == id);
    }
}