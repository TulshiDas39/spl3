using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class QuestionService
    {
        private readonly IMongoCollection<Question> _questions;

        public QuestionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Question>(settings.QuestionsCollectionName);
        }

        public List<Question> Get() =>
            _questions.Find(Question => true).ToList();

        public Question Get(string id) =>
            _questions.Find<Question>(Question => Question.Id == id).FirstOrDefault();

        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public void Update(string id, Question questionIn) =>
            _questions.ReplaceOne(question => question.Id == id, questionIn);

        public void Remove(Question questionIn) =>
            _questions.DeleteOne(question => question.Id == questionIn.Id);

        public void Remove(string id) => 
            _questions.DeleteOne(question => question.Id == id);
    }
}