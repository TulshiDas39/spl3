using ForumApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class CommentService
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _comments = database.GetCollection<Comment>(settings.CommentsCollectionName);
        }

        public List<Comment> Get() =>
            _comments.Find(Comment => true).ToList();

        public Comment Get(string id) =>
            _comments.Find<Comment>(Comment => Comment.id == id).FirstOrDefault();

        public Comment Create(Comment comment)
        {
            _comments.InsertOne(comment);
            return comment;
        }

        public void Update(string id, Comment commentIn) =>
            _comments.ReplaceOne(comment => comment.id == id, commentIn);

        public void Remove(Comment commentIn) =>
            _comments.DeleteOne(comment => comment.id == commentIn.id);

        public void Remove(string id) => 
            _comments.DeleteOne(comment => comment.id == id);

        internal bool Exist(Comment comment)
        {
            if (comment.id == null) return false;
            if (comment.id.Length != 24) return false;
            if (Get(comment.id) == null) return false;
            return true;
        }
    }
}