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
            var voteItem = Get(vote.postId, vote.userId, vote.postType);

            if (voteItem != null)
            {
                if(!IsValid(vote, voteItem)) return null;
                UpdateRatings(vote, 2);
                //voteItem.isUpvote = !voteItem.isUpvote;
                vote.id = voteItem.id;
                _votes.ReplaceOne(item => item.id == voteItem.id, vote);
                return vote;
            }
            else
            {
                UpdateRatings(vote, 1);
                _votes.InsertOne(vote);
                return vote;
            }

        }

        private bool IsValid(Vote vote, Vote existingVote)
        {
            if(vote.isUpvote == existingVote.isUpvote) return false;
            return true;
        }

        private void UpdateRatings(Vote vote, int iterator)
        {
            if (vote.postType == "Q")
            {
                var question = _questionService.Get(vote.postId);
                if (vote.isUpvote) question.ratings += iterator;
                else question.ratings -= iterator;
                _questionService.Update(question.id, question);
            }
            else
            {
                var answer = _answerService.Get(vote.postId);
                if (vote.isUpvote) answer.ratings += iterator;
                else answer.ratings -= iterator;
                _answerService.Update(answer.id, answer);
            }
        }


    }
}