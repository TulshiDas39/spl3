using ForumApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;

namespace ForumApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly TagService _tagService;

        private ILogger _logger;

        public UserService(IDatabaseSettings settings, TagService tagItemService,ILogger<UserService> logger)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _tagService = tagItemService;
            _logger = logger;
        }

        public List<User> Get() =>
            _users.Find(User => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(User => User.userId == id).FirstOrDefault();
        public User GetById(string id) =>
            _users.Find<User>(User => User.id == id).FirstOrDefault();

        public List<User> Get(int skip, int limit){
            return _users.Find(User=>true).SortByDescending(user=>user.reputation).Skip(skip).Limit(limit).ToList();
        }

        internal List<User> GetSearchedUsers(string match)
        {
            List<User> users = new List<User>();
            int i = 0;
            int chunk = 60;
            List<User> list;
            do
            {
                list = _users.Find(item => true).Skip(i * chunk).Limit(chunk).ToList();
                Push(users, list, match);
                if (users.Count > 20) return users;
            } while (list.Count == chunk);

            return users;
        }

        private void Push(List<User> users, List<User> items, string match)
        {
            foreach (var item in items)
            {
                if (item.name.ToLower().StartsWith(match))
                {
                    users.Add(item);
                    if (users.Count > 20) return;
                }
            }
        }

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

        public bool follow(string tagId, string userId)
        {
            _logger.LogDebug("tagid:"+tagId);
            TagItem tagItem = _tagService.Get(tagId);
            if(tagItem == null) return false;
            User user = Get(userId);
            _logger.LogDebug("user id:"+userId);
            if(user == null) return false;
            _logger.LogDebug("ok");

            List<string> followedTags = Utility.Tokenize(user.tags).ToList();

            if(!followedTags.Contains(tagItem.name)){
                _logger.LogDebug("updating information") ;
                user.tags += " "+tagItem.name;
                Update(user.id,user);

                tagItem.users++;
                _tagService.Update(tagItem.id, tagItem);

            }
            
            return true;

        }

        public bool Unfollow(string tagId, string userId){
            TagItem tagItem = _tagService.Get(tagId);
            if(tagItem == null) return false;
            User user = Get(userId);
            if(user == null) return false;

            List<string> followedTags = Utility.Tokenize(user.tags).ToList();

            if(followedTags.Contains(tagItem.name)){ 
                //user.tags += tagItem.name;
                followedTags.Remove(tagItem.name);
                user.tags = Utility.ArrayToString(followedTags);
                Update(user.id,user);

                tagItem.users--;
                _tagService.Update(tagItem.id, tagItem);

            }
            
            return true;
        }



        public void Remove(string id) => 
            _users.DeleteOne(user => user.id == id);
    }
}