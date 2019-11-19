using ForumApi.Models;
using MongoDB.Driver;
using System;
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
            _tags.Find<TagItem>(TagItem => TagItem.id == id).FirstOrDefault();

        public TagItem GetByName(string tagname) =>
            _tags.Find<TagItem>(TagItem => TagItem.name == tagname).FirstOrDefault();

        public TagItem Create(TagItem tag)
        {
            _tags.InsertOne(tag);
            return tag;
        }

        public void Update(string id, TagItem tagIn) =>
            _tags.ReplaceOne(tag => tag.id == id, tagIn);

        public void Remove(TagItem tagIn) =>
            _tags.DeleteOne(tag => tag.id == tagIn.id);

        public void Remove(string id) => 
            _tags.DeleteOne(tag => tag.id == id);

        internal void InsertIfNotExist(string tags)
        {
            List<string> tagList = Utility.Tokenize(tags).ToList();
            foreach(var item in tagList){
                if(GetByName(item.ToLower()) == null){
                    TagItem tagItem = new TagItem();
                    tagItem.description="";
                    tagItem.name = item.ToLower();
                    tagItem.users = 0;

                    Create(tagItem);
                }
            }
        }
    }
}