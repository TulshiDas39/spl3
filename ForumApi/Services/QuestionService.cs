using ForumApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

//using Serilog;

namespace ForumApi.Services
{
    public class QuestionService
    {
        private int recommendListSize = 20;
        // private Utility utility = new Utility();
        private readonly IMongoCollection<Question> _questions;

        private readonly ILogger _logger;
        private readonly UserService _userService;

        private readonly RecommendationService _recommendationService;

        public QuestionService(IDatabaseSettings settings, ILogger<QuestionService> logger, UserService userService,
            RecommendationService recommendationService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Question>(settings.QuestionsCollectionName);
            _userService = userService;
            _recommendationService = recommendationService;
            _logger = logger;
        }

        public int GetQuestionsCountThisWeek(string name, long timeInterval)
        {
            return CountQuestionsAtTimeInterval(name, timeInterval);
        }

        private int CountQuestionsAtTimeInterval(string name, long timeInterval)
        {
            


            //Regex.Split(item.tags.Trim(), "\\s+").Contains(name) 
            //_questions.Find<Question>(item => true).ToList().Count;
            var list = _questions.Find<Question>(item => item.datetime > timeInterval).ToList();
            int count = 0;
            foreach (var item in list)
            {
                if (Utility.Tokenize(item.tags).Contains(name)) count++;
            }

            return count;
        }

        public Question Get(string questionId) =>
             _questions.Find<Question>(Question => Question.id == questionId).FirstOrDefault();
        public List<Question> Get() =>
            _questions.Find(Question => true).ToList();

        public List<Question> Get(int skip, int limit)
        {
            _logger.LogDebug("skip:" + skip + ", limit" + limit);
            return _questions.Find(Question => true).SortByDescending(question => question.id).Skip(skip).Limit(limit).ToList();
        }

        public List<Question> GetByUser(string userId, int skip, int limit) =>
            _questions.Find(Question => Question.userId == userId).SortByDescending(question => question.id).Skip(skip).Limit(limit).ToList();


        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public bool Exist(Question question)
        {
            if (question.id == null) return false;
            if (question.id.Length != 24) return false;
            if (Get(question.id) == null) return false;
            return true;
        }

        internal ActionResult<List<Question>> getAnswerLessQuestions(int skip, int limit)
        {
            ActionResult<List<Question>> list = _questions.Find(Question => Question.isAccepted == false).SortByDescending(question => question.id).Skip(skip).Limit(limit).ToList();

            return list;
        }

        public void Update(string id, Question questionIn) =>
            _questions.ReplaceOne(question => question.id == id, questionIn);

        internal ActionResult<List<Question>> GetByUser(string userId)
        {

            throw new NotImplementedException();
        }

        public List<Question> Recommend(string userId, int iteration)
        {
            List<Question> list = new List<Question>();
            List<string> tags = Utility.Tokenize(_userService.Get(userId).tags).ToList();
            _logger.LogDebug("\ntags:");
            PrintDictionary(tags);
            List<Question> questions;
            List<string> userRecommendations = GetUserRecommendations(tags);


            do
            {
                questions = Get(recommendListSize * iteration, recommendListSize);
                foreach (var item in questions)
                {
                    List<string> questionTags = Utility.Tokenize(item.tags).ToList();
                    if (questionTags.Intersect(tags).Count() >= 1) list.Add(item);
                    else if (IsRecommended(questionTags, userRecommendations)) list.Add(item);
                    if (list.Count == recommendListSize) return list;
                }
                iteration++;

            } while (questions.Count == 20);

            return list;
        }

        private List<string> GetUserRecommendations(List<string> tags)
        {
            List<string> recommendationList = _recommendationService.GetFirst().recommendations.ToList();
            List<string> userRecommendations = new List<string>();

            foreach (var item in recommendationList)
            {
                List<string> predecessors = GetDependency(item);
                if (predecessors.Intersect(tags).Count() == predecessors.Count)
                {
                    string resultant = GetResultant(item);
                    if (!userRecommendations.Contains(resultant)) userRecommendations.Add(resultant);
                }
            }


            _logger.LogDebug("\nUserRecommendations:");
            PrintDictionary(userRecommendations);
            return userRecommendations;
        }

        private string GetResultant(string item)
        {
            return Utility.Tokenize(item).Last();
        }

        private bool IsRecommended(List<string> questionTags, List<string> userRecommendations)
        {
            if (questionTags.Intersect(userRecommendations).Count() >= 1) return true;
            return false;
        }

        private void PrintDictionary(IEnumerable<string> dic)
        {
            foreach (var item in dic)
            {
                _logger.LogDebug("item: " + item);
            }
        }

        private List<string> GetDependency(string association)
        {
            List<string> dependency = new List<string>();
            var tokens = Utility.Tokenize(association).ToList();
            tokens.Remove(tokens.Last());

            return tokens;
        }

        public void Remove(Question questionIn) =>
            _questions.DeleteOne(question => question.id == questionIn.id);

        public void Remove(string id)
        {        
            _questions.DeleteOne(question => question.id == id);
        }
    }
}