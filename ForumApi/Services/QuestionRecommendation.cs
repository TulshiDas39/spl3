using System;
using System.Linq;
using ForumApi.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace ForumApi.Services
{
    public class QuestionRecommendation
    {
        private UserService _userService;

        private RecommendationService _recommendationService;
        private ILogger _logger;
        private double _minConfidence = 0.5;
        private double _minSupport = 0.4;

        private int _minSupportCount;

        public QuestionRecommendation(UserService userService, RecommendationService recommendationService, ILogger<QuestionSimilarity> logger)
        {
            _userService = userService;
            _recommendationService = recommendationService;
            _logger = logger;
        }

        public List<Question> Recommend(string userId, int iteration)
        {
            List<Question> list = new List<Question>();
            _logger.LogDebug("question count:" + list.Count);
            return list;
        }

        public void PrepareRecommendations()
        {
            List<User> users = _userService.Get();
            List<string> tags = new List<string>();

            users.ForEach(user =>
            {
                if (user.tags != "") tags.Add(user.tags);
            });

            //Init(tags);

            Apriori(tags);
        }

        private void Apriori(List<string> tags)
        {
            _minSupportCount = (int)(_minSupport * tags.Count);
            _logger.LogDebug("tags:");
            printDictionary(tags);
            _logger.LogDebug("min support:" + _minSupportCount);
            Console.WriteLine("using console.write line");

            Dictionary<string, int> frequentItemSets = new Dictionary<string, int>();
            Dictionary<string, double> associations = new Dictionary<string, double>();
            Dictionary<string, int> newCandidates = GenerateCandidates(tags);
            _logger.LogDebug("\nnew candidates:\n");
            printDictionary(newCandidates);
            Filter(newCandidates);
            _logger.LogDebug("\nafter filter candidates:\n");
            printDictionary(newCandidates);

            mergeCandidates(frequentItemSets, newCandidates);
            Dictionary<string, int> oldCandidates = newCandidates;

            int iteration = 0;

            while (oldCandidates.Count() > 0 )
            {
                if(iteration > 4 ) break;
                newCandidates = GenerateCandidates(oldCandidates, tags);
                _logger.LogDebug("\nnew candidates:\n");
                printDictionary(newCandidates);
                Filter(newCandidates);
                _logger.LogDebug("\nafter filter candidates:\n");
                printDictionary(newCandidates);
                GenerateAssociations(newCandidates, frequentItemSets, associations);
                _logger.LogDebug("\nassociations:\n");
                printDictionary(associations);
                mergeCandidates(frequentItemSets, newCandidates);
                oldCandidates = newCandidates;
            }
            _logger.LogDebug("out of loop");

            string[] associationRules = associations.Keys.ToArray();
            Recommendation recommendation = new Recommendation();
            recommendation.recommendations = associationRules;

            _recommendationService.UpdateFirst(recommendation);

        }



        private void GenerateAssociations(Dictionary<string, int> newCandidates, Dictionary<string, int> frequentItemSets, Dictionary<string, double> associations)
        {
            foreach (var item in newCandidates)
            {
                CreateAssociationItems(item, frequentItemSets, associations, newCandidates);
            }
        }

        private void CreateAssociationItems(KeyValuePair<string, int> item, Dictionary<string, int> frequentItemSets, Dictionary<string, double> associations, Dictionary<string, int> newCandidates)
        {
            string[] tokens = Utility.Tokenize(item.Key);
            string association = item.Key;

            List<string> rules = GetRules(item.Key, frequentItemSets);

            ResolveWithConfidence(rules, associations, newCandidates, frequentItemSets);

        }

        private List<string> GetRules(string key, Dictionary<string, int> frequentItemSets)
        {
            List<string> rules = new List<string>();
            string[] tokens = Utility.Tokenize(key);
            foreach (var token in tokens)
            {
                var rule = key.Replace(token, "") + " " + token;
                rule = rule.Replace("  ", " ").Trim();
                rules.Add(rule);
            }

            return rules;
        }

        private void ResolveWithConfidence(List<string> rules, Dictionary<string, double> associations, Dictionary<string, int> newCandidates, Dictionary<string, int> frequentItemSets)
        {
            double confidence;

            foreach (var item in rules)
            {
                confidence = GetConfidence(item, frequentItemSets, newCandidates);
                if (confidence >= _minConfidence) associations.Add(item, confidence);
            }
        }

        private double GetConfidence(string rule, Dictionary<string, int> frequentItemSets, Dictionary<string, int> newCandidates)
        {

            string[] tokenRules = Utility.Tokenize(rule);
            int totalSupport = 0;

            foreach (var item in newCandidates)
            {
                string[] tokens = Utility.Tokenize(item.Key);
                if (tokens.Intersect(tokenRules).Count() == tokenRules.Length)
                {
                    totalSupport = item.Value;
                    break;
                }
            }

            List<string> predecessors = tokenRules.ToList();
            predecessors.Remove(tokenRules.Last());
            int predecessorSupport = Int32.MaxValue;

            foreach (var item in frequentItemSets)
            {
                string[] tokens = Utility.Tokenize(item.Key);
                if (tokens.Intersect(predecessors).Count() == predecessors.Count)
                {
                    predecessorSupport = item.Value;
                    break;
                }
            }

            return (double)totalSupport / predecessorSupport;

        }

        private void mergeCandidates(Dictionary<string, int> dic, Dictionary<string, int> newCandidates)
        {
            foreach (var candidate in newCandidates)
            {
                dic.Add(candidate.Key, candidate.Value);
            }
        }

        private void Filter(Dictionary<string, int> dic)
        {

            List<string> keys = new List<string>();
            for (int i = 0; i < dic.Keys.Count; i++)
            {
                string key = dic.Keys.ElementAt(i);
                if (dic[key] < _minSupportCount) keys.Add(key);
            }

            keys.ForEach(key =>
            {
                dic.Remove(key);
            });

        }

        private Dictionary<string, int> GenerateCandidates(Dictionary<string, int> previousCandidates, List<string> tags)
        {
            Dictionary<string, int> newCandidates = new Dictionary<string, int>();
            int interSectCount = Utility.Tokenize(previousCandidates.Keys.ElementAt(0)).Length - 1;
            // _logger.LogDebug("preveous candidates:");
            //printDictionary(previousCandidates);
            for (int i = 0; i < previousCandidates.Keys.Count; i++)
            {
                string key = previousCandidates.Keys.ElementAt(i);
                string[] words = Utility.Tokenize(key);

                for (int j = i + 1; j < previousCandidates.Keys.Count; j++)
                {
                    CreateCandidate(previousCandidates, newCandidates, interSectCount, words, j, tags);
                }
            }

            return newCandidates;
        }

        private void CreateCandidate(Dictionary<string, int> previousCandidates, Dictionary<string, int> newCandidates, int interSectCount, string[] tags, int index, List<string> allTags)
        {
            string key = previousCandidates.Keys.ElementAt(index);
            string[] tags2 = Utility.Tokenize(key);
            int intersection = tags.Intersect(tags2).Count();
            if (interSectCount == intersection)
            {
                IEnumerable<string> newCandidate = tags.Union(tags2);
                string newCandidateStr = Utility.ArrayToString(newCandidate);
                //_logger.LogDebug("newCandidateStr:" + newCandidateStr);
                int support = MeasureSupport(newCandidate, allTags);
                if (!Exist(newCandidateStr, newCandidates))
                    newCandidates.Add(newCandidateStr, support);
            }
        }

        private bool Exist(string newCandidateStr, Dictionary<string, int> newCandidates)
        {
            var candidateTokens = Utility.Tokenize(newCandidateStr);
            foreach (var item in newCandidates)
            {
                var tokens = Utility.Tokenize(item.Key);
                if (tokens.Intersect(candidateTokens).Count() == candidateTokens.Count()) return true;
            }
            return false;
        }

        private int MeasureSupport(IEnumerable<string> words2, List<string> tags)
        {
            int support = 0;
            string[] words;
            tags.ForEach(item =>
            {
                words = Utility.Tokenize(item);
                if (words.Intersect(words2).Count() == words2.Count()) support++;
            });

            return support;
        }
        private Dictionary<string, int> GenerateCandidates(List<string> tags)
        {
            Dictionary<string, int> dic = new Dictionary<string, int>();

            tags.ForEach(tag =>
            {
                string[] items = Utility.Tokenize(tag);
                for (int i = 0; i < items.Length; i++)
                {
                    if (dic.ContainsKey(items[i]))
                    {
                        dic[items[i]] += 1;
                    }

                    else
                    {
                        dic.Add(items[i], 1);
                    }
                }
            });

            return dic;
        }

        private void printDictionary(Dictionary<string, int> dic)
        {
            for (int i = 0; i < dic.Keys.Count; i++)
            {
                _logger.LogDebug("key: " + dic.Keys.ElementAt(i) + " value: " + dic[dic.Keys.ElementAt(i)]);
            }
        }

        private void printDictionary(Dictionary<string, double> dic)
        {
            for (int i = 0; i < dic.Keys.Count; i++)
            {
                _logger.LogDebug("key: " + dic.Keys.ElementAt(i) + " value: " + dic[dic.Keys.ElementAt(i)]);
            }
        }

        private void printDictionary(IEnumerable<string> dic)
        {
            for (int i = 0; i < dic.Count(); i++)
            {
                _logger.LogDebug("list item: " + dic.ElementAt(i));
            }
        }



    }

}