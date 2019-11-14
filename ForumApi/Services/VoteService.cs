using System;
using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class VoteSurvice
    {

        QuestionService _questionService;
        AnswerService _answerService;
        CommentService _commentService;

        private readonly IMongoCollection<Vote> _votes;

        public VoteSurvice(IDatabaseSettings settings,
        QuestionService questionService, AnswerService answerService,
        CommentService commentService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _votes = database.GetCollection<Vote>(settings.VotesCollectionName);

            _questionService = questionService;
            _answerService = answerService;
            _commentService = commentService;
        }

        public Vote Get(string postId, string userId, string postType)
        {
            return _votes.Find<Vote>((item) => 
                item.userId == userId && item.postId == postId && item.postType == postType
            ).FirstOrDefault();
        }

        public Vote Get(string id)
        {
            return _votes.Find<Vote>(item => item.id == id).FirstOrDefault();
        }

        public Vote InsertOne(Vote vote)
        {
            _votes.InsertOne(vote);
            return vote;
        }
    }
}