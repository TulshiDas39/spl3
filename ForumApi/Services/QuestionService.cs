using ForumApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Serilog;

namespace ForumApi.Services
{
    public class QuestionService
    {
        private int recommendListSize = 2;
        // private Utility utility = new Utility();
        private readonly IMongoCollection<Question> _questions;

        public QuestionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Question>(settings.QuestionsCollectionName);
        }

        public Question Get(string questionId) =>
             _questions.Find<Question>(Question => Question.Id == questionId).FirstOrDefault();
        public List<Question> Get() =>
            _questions.Find(Question => true).ToList();

        public List<Question> Get(int skip, int limit) =>
            _questions.Find(Question => true).SortByDescending(question => question.Id).Skip(skip).Limit(limit).ToList();

        public List<Question> GetByUser(string userId, int skip, int limit) =>
            _questions.Find(Question => Question.UserId == userId).SortByDescending(question => question.Id).Skip(skip).Limit(limit).ToList();


        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public void Update(string id, Question questionIn) =>
            _questions.ReplaceOne(question => question.Id == id, questionIn);

        internal ActionResult<List<Question>> GetByUser(string userId)
        {

            throw new NotImplementedException();
        }

        internal List<Question> recommend(User user, int iteration)
        {
            List<Question> list = new List<Question>();

            List<Question> listAll = _questions.Find(question => true).SortByDescending(question => question.Id).ToList();

            int i = 0;
            foreach (Question q in listAll)
            {
                if (i >= recommendListSize) break;
                if (Utility.hasCommon(user.Tags, q.Tags))
                {
                    Log.Information("usre.Tags:" + user.Tags);
                    Log.Information("question.Tags:" + q.Tags);
                    list.Add(q);
                    i++;
                }

            }

            return list;
        }

        private bool hasCommon(string a, string b)
        {
            return true;
        }

        public void Remove(Question questionIn) =>
            _questions.DeleteOne(question => question.Id == questionIn.Id);

        public void Remove(string id) =>
            _questions.DeleteOne(question => question.Id == id);
    }
}