using ForumApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class QuestionService
    {
        private int recommendListSize = 2;
        private Utility utility = new Utility();
        private readonly IMongoCollection<Question> _questions;

        public QuestionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Question>(settings.QuestionsCollectionName);
        }

        public List<Question> Get() =>
            _questions.Find(Question => true).SortByDescending(question => question.Id).Skip(2).Limit(2).ToList();

        public Question Get(string id) =>
            _questions.Find<Question>(Question => Question.Id == id).FirstOrDefault();

        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public void Update(string id, Question questionIn) =>
            _questions.ReplaceOne(question => question.Id == id, questionIn);

        internal ActionResult<List<Question>> GetByUser(string questionId)
        {

            throw new NotImplementedException();
        }

        internal ActionResult<List<Question>> recommend(User user, int iteration)
        {
         
            // return _questions.Find((question)=>  this.hasCommon(user.Tags, question.Tags)).
            //     Skip(iteration*recommendListSize).Limit(recommendListSize).ToList();

            // return _questions.AsQueryable().AsEnumerable().Select(q =>
            // {
            //     string[] uTags = user.Tags.Trim().Split(@"\s+");
            //     string[] qTags = q.Tags.Trim().Split(@"\s+");
            //     foreach (string qTag in qTags)
            //     {
            //         if (uTags.Contains(qTag)) { return q; };
            //     }
            // }).ToList();

            List<Question> list = new List<Question>();

            List<Question> listAll = _questions.Find(question=> true).SortByDescending(question => question.Id).ToList();

            int i=0;
            foreach(Question q in listAll){
                if(i>=recommendListSize) break;
                if(Utility.hasCommon(user.Tags, q.Tags)){ 
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