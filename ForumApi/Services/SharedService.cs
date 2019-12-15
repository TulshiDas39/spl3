using System;
using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel;


namespace ForumApi.Services
{
    public class SharedService
    {
        private VoteService _voteService;
        private QuestionService _questionService;
        private AnswerService _answerService;
        private UserService _userService;
        private CommentService _commentService;
        private ILogger _logger;
        public SharedService(VoteService voteSurvice, QuestionService questionService,
         AnswerService answerService, UserService userService, CommentService commentService,
         ILogger<SharedService> logger)
        {
            _voteService = voteSurvice;
            _questionService = questionService;
            _answerService = answerService;
            _userService = userService;
            _commentService = commentService;
            _logger = logger;
        }
        public void UpdateRatings(Vote vote, int ratingIncreamenter)
        {

            if (vote.postType == "Q")
            {
                var question = _questionService.Get(vote.postId);
                if (vote.isUpvote) question.ratings += ratingIncreamenter;
                else question.ratings -= ratingIncreamenter;
                _questionService.Update(question.id, question);
            }
            else if (vote.postType == "A")
            {
                var answer = _answerService.Get(vote.postId);
                if (vote.isUpvote) answer.ratings += ratingIncreamenter;
                else answer.ratings -= ratingIncreamenter;
                _answerService.Update(answer.id, answer);
            }
            else
            {
                var comment = _commentService.Get(vote.postId);
                if (vote.isUpvote) comment.ratings += ratingIncreamenter;
                else comment.ratings -= ratingIncreamenter;
                _commentService.Update(comment.id, comment);
            }

        }

        internal void UpdateUserPopularity(Vote vote)
        {
            User user;
            if (vote.postType == "C")
            {
                string userId = _commentService.Get(vote.postId).userId;
                user = _userService.Get(userId);

                if (vote.isUpvote) user.reputation += 1;
                else user.reputation -= 1;
            }
            else if (vote.postType == "A")
            {
                string userId = _answerService.Get(vote.postId).userId;
                user = _userService.Get(userId);
                if (vote.isUpvote) user.reputation += 2;
                else user.reputation -= 2;
            }

            else
            {
                string userId = _questionService.Get(vote.postId).userId;
                user = _userService.Get(userId);
                if (vote.isUpvote) user.reputation += 2;
                else user.reputation -= 2;
            }

            _userService.Update(user.id, user);
        }

        public void PrintObject(object obj)
        {
            foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(obj))
            {
                string name = descriptor.Name;
                object value = descriptor.GetValue(obj);
                _logger.LogDebug("{0}={1}", name, value);
            }
        }

        public void CheckQuestionRating(Vote vote)
        {
            if (vote.postType == "Q")
            {
                Question question = _questionService.Get(vote.postId);
                if (question.ratings < -5)
                {
                    _questionService.Remove(question);
                    _answerService.RemoveMany(vote.postId);
                }
            }
            else if (vote.postType == "A")
            {
                Answer answer = _answerService.Get(vote.postId);
                if(answer.ratings < -5) _answerService.Remove(answer);
            }

            else if (vote.postType == "C")
            {
                Comment comment = _commentService.Get(vote.postId);
                if(comment.ratings < -5) _commentService.Remove(comment);
            }
        }
    }

}