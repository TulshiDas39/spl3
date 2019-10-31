using System;
using System.Linq;
using ForumApi.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace ForumApi.Services
{
    public class QuestionRecommendation{
        private QuestionService _questionService;
        private ILogger _logger;

        public QuestionRecommendation(QuestionService questionService, ILogger<QuestionSimilarity> logger)
        {
            _questionService = questionService;
            _logger = logger;
        }

        public List<Question> Recommend(string userId, int iteration){
            List<Question> list = new List<Question>();

            return list;
        }


    }

}