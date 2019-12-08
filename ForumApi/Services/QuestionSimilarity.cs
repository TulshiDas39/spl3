using System;
using System.Linq;
using ForumApi.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace ForumApi.Services
{
    public class QuestionSimilarity
    {

        private QuestionService _questionService;
        private ILogger _logger;
        public QuestionSimilarity(QuestionService questionService, ILogger<QuestionSimilarity> logger)
        {
            _questionService = questionService;
            _logger = logger;
        }

        public List<Question> getSimilarQuestions(string askedQuestionData, bool considerTags = false)
        {
            int iteration = 0;
            int chunkSize = 50;
            List<Question> questionList;
            int seperatorIndex = askedQuestionData.LastIndexOf('|');
            List<string> tags = new List<string>();
            if (considerTags)
            {
                string tagStr = askedQuestionData.Substring(seperatorIndex+1, askedQuestionData.Length - seperatorIndex - 1);
                tags = Utility.Tokenize(tagStr).ToList();
                askedQuestionData = askedQuestionData.Substring(0, seperatorIndex);
            }

            SortedList<double, Question> sortedQuestionList = new SortedList<double, Question>();
            init(sortedQuestionList);
            do
            {
                questionList = _questionService.Get(iteration * chunkSize, chunkSize);
                if(considerTags) extractSimilarQuestions(sortedQuestionList, questionList, askedQuestionData,tags);
                else extractSimilarQuestions(sortedQuestionList, questionList, askedQuestionData);
                iteration++;
                _logger.LogDebug("questionList size:" + questionList.Count);
            } while (questionList.Count == chunkSize);
            List<Question> similarQuestions = sortedQuestionList.Values.ToList();
            similarQuestions.Reverse();
            //return _questionService.Get(0, 15);
            removeNullObjects(similarQuestions);

            return similarQuestions;
        }

        private void extractSimilarQuestions(SortedList<double, Question> sortedQuestionList, List<Question> questionList, string askedQuestionData, List<string> tags)
        {
             _logger.LogDebug("extracting similar question");
            for (int i = 0; i < questionList.Count; i++)
            {
                double lowestSimilarity = sortedQuestionList.Keys.First();
                _logger.LogDebug("lowestSimilarity:" + lowestSimilarity);

                string existingQuestionData = questionList[i].title;
                List<string> existingTags = Utility.Tokenize(questionList[i].tags).ToList();
                if(existingTags.Intersect(tags).Count() == 0) continue;
                double cosineSimilarity = getCosineSimilarity(askedQuestionData, existingQuestionData);
                _logger.LogDebug("cosine similarity:" + cosineSimilarity);

                insertSimilarQuestion(cosineSimilarity, questionList[i], sortedQuestionList);

            }

            printList(sortedQuestionList);
        }

        private void removeNullObjects(List<Question> similarQuestions)
        {
            List<Question> nullObjects = new List<Question>();
            foreach (Question q in similarQuestions)
            {
                if (q.id == null) nullObjects.Add(q);
            }

            foreach (Question q in nullObjects)
            {
                similarQuestions.Remove(q);
            }
        }

        private void extractSimilarQuestions(SortedList<double, Question> sortedQuestionList, List<Question> questionList, string askedQuestionData)
        {
            _logger.LogDebug("extracting similar question");
            for (int i = 0; i < questionList.Count; i++)
            {
                double lowestSimilarity = sortedQuestionList.Keys.First();
                _logger.LogDebug("lowestSimilarity:" + lowestSimilarity);

                string existingQuestionData = questionList[i].title;
                double cosineSimilarity = getCosineSimilarity(askedQuestionData, existingQuestionData);
                _logger.LogDebug("cosine similarity:" + cosineSimilarity);

                insertSimilarQuestion(cosineSimilarity, questionList[i], sortedQuestionList);

            }

            printList(sortedQuestionList);

        }

        private void insertSimilarQuestion(double cosineSimilarity, Question question,
            SortedList<double, Question> sortedQuestionList)
        {
            double lowestSimilarity = sortedQuestionList.Keys.First();
            if (cosineSimilarity > lowestSimilarity)
            {
                int flag = 1;
                while (sortedQuestionList.Keys.Contains(cosineSimilarity))
                {
                    cosineSimilarity += flag / 1000;
                    flag++;
                }

                sortedQuestionList.Remove(lowestSimilarity);
                sortedQuestionList.Add(cosineSimilarity, question);
            }

        }

        private void printList(SortedList<double, Question> list)
        {
            _logger.LogDebug("new sorted list");
            foreach (var item in list)
            {
                _logger.LogDebug("similarity:" + item.Key);
                _logger.LogDebug("question title:" + item.Value.title);
            }
        }

        private void init(SortedList<double, Question> list)
        {
            // int count = 15;
            // List<Question> questionList = _questionService.Get(0, count);
            // for (int i = 0; i < count; i++)
            // {
            //     string existingQuestionData = getQuestionData(questionList[i]);
            //     double similarity = getCosineSimilarity(questionData, existingQuestionData);
            // }

            int count = 15;
            double randNum = 10000.0;
            for (int i = 0; i < count; i++)
            {
                list.Add(i / randNum, new Question());
            }

        }

        private string getQuestionData(Question question)
        {
            string strTag = question.tags;
            return "";
        }


        private double getCosineSimilarity(string sentence1, string sentence2)
        {
            _logger.LogDebug("measuring similarity");
            _logger.LogDebug("sentence1:" + sentence1);
            _logger.LogDebug("sentence2:" + sentence2);
            List<string> xList = Utility.Tokenize(sentence1).ToList();
            List<string> yList = Utility.Tokenize(sentence2).ToList();
            printArray(xList);
            printArray(yList);

            removeStopWords(xList);
            _logger.LogDebug("stop words removed from xList");
            printArray(xList);
            removeStopWords(yList);
            _logger.LogDebug("stop words removed from ylist");

            List<string> allWords = xList.Union(yList).ToList();

            List<int> vec1 = new List<int>();
            List<int> vec2 = new List<int>();

            foreach (var item in allWords)
            {
                if (xList.Contains(item)) vec1.Add(1);
                else vec1.Add(0);
                if (yList.Contains(item)) vec2.Add(1);
                else vec2.Add(0);
            }

            int sum = 0;

            for (int i = 0; i < allWords.Count; i++)
            {
                sum += vec1[i] * vec2[i];
            }

            double cosine = sum / Math.Sqrt(vec1.Sum() * vec2.Sum());
            _logger.LogDebug("cosine:" + cosine);

            return cosine;
        }

        private void removeStopWords(List<string> list)
        {
            List<string> matchedStopWords = new List<string>();
            foreach (var item in list)
            {
                if (DataService.englishStopWords.Contains(item) || DataService.bengaliStopWords.Contains(item))
                    matchedStopWords.Add(item);
                //list.Remove(item);
            }

            foreach (string item in matchedStopWords)
            {
                list.Remove(item);
            }
        }

        private void printArray(List<string> list)
        {
            _logger.LogDebug("printing array:");
            foreach (var item in list)
            {
                _logger.LogDebug(item);
            }
        }
    }
}