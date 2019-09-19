using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class AnswerService
    {
        private readonly IMongoCollection<Answer> _answers;

        public AnswerService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _answers = database.GetCollection<Answer>(settings.AnswersCollectionName);
        }

        public List<Answer> Get() =>
            _answers.Find(Answer => true).ToList();

        public Answer Get(string id) =>
            _answers.Find<Answer>(Answer => Answer.Id == id).FirstOrDefault();

        public Answer Create(Answer answer)
        {
            _answers.InsertOne(answer);
            return answer;
        }

        public void Update(string id, Answer answerIn) =>
            _answers.ReplaceOne(answer => answer.Id == id, answerIn);

        public void Remove(Answer answerIn) =>
            _answers.DeleteOne(answer => answer.Id == answerIn.Id);

        public void Remove(string id) => 
            _answers.DeleteOne(answer => answer.Id == id);
    }
}