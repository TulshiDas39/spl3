using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class TagItemService
    {
        private readonly IMongoCollection<TagItem> _tags;

        public TagItemService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _tags = database.GetCollection<TagItem>(settings.TagItemsCollectionName);
        }

        public List<TagItem> Get() =>
            _tags.Find(TagItem => true).ToList();

        public TagItem Get(string id) =>
            _tags.Find<TagItem>(TagItem => TagItem.Id == id).FirstOrDefault();

        public TagItem Create(TagItem tag)
        {
            _tags.InsertOne(tag);
            return tag;
        }

        public void Update(string id, TagItem tagIn) =>
            _tags.ReplaceOne(tag => tag.Id == id, tagIn);

        public void Remove(TagItem tagIn) =>
            _tags.DeleteOne(tag => tag.Id == tagIn.Id);

        public void Remove(string id) => 
            _tags.DeleteOne(tag => tag.Id == id);
    }
}