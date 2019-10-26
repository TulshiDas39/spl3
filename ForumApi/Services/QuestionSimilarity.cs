using System;
using System.Linq;
using ForumApi.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace ForumApi.Services{
    public class QuestionSimilarity{

        private QuestionService _questionService;
        private ILogger _logger;
        public QuestionSimilarity(QuestionService questionService, ILogger<QuestionSimilarity> logger){
            _questionService = questionService;
            _logger = logger;
        }

        public List<Question> getSimilarQuestions(string questionData){
            //getSimilarity("s","sd");
            return _questionService.Get(0,15);
        }
        private double getSimilarity(string sentence1, string sentence2){
            return 0.0;
        }
    }
}