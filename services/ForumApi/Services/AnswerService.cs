using BooksApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class AnswerService
    {
        private readonly IMongoCollection<Pen> _pens;

        public PenService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pens = database.GetCollection<Pen>(settings.PensCollectionName);
        }

        public List<Pen> Get() =>
            _pens.Find(pen => true).ToList();

        public Pen Get(string id) =>
            _pens.Find<Pen>(pen => pen.Id == id).FirstOrDefault();

        public Pen Create(Pen pen)
        {
            _pens.InsertOne(pen);
            return pen;
        }

        public void Update(string id, Pen penIn) =>
            _pens.ReplaceOne(pen => pen.Id == id, penIn);

        public void Remove(Pen penIn) =>
            _pens.DeleteOne(pen => pen.Id == penIn.Id);

        public void Remove(string id) => 
            _pens.DeleteOne(pen => pen.Id == id);
    }
}