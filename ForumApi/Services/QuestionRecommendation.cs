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
        private ILogger _logger;
        private double _minConfidence = 0.5;
        private double _minSupport = 0.4;

        private int _minSupportCount;

        public QuestionRecommendation(UserService userService, ILogger<QuestionSimilarity> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        public List<Question> Recommend(string userId, int iteration)
        {
            List<Question> list = new List<Question>();
            _logger.LogDebug("question count:" + list.Count);
            return list;
        }

        public void prepareRecommendations()
        {
            List<User> users = _userService.Get();
            List<string> tags = new List<string>();

            users.ForEach(user =>
            {
                tags.Add(user.tags);
            });

            Apriori(tags);
        }

        private void Apriori(List<string> tags)
        {
            _minSupportCount = (int)(_minSupport * tags.Count);
            Console.WriteLine("min support:" + _minSupportCount);

            Dictionary<string, int> frequentItemSets = new Dictionary<string, int>();
            Dictionary<string, int> associations = new Dictionary<string, int>();
            Dictionary<string, int> newCandidates = GenerateCandidates(tags);
            Filter(newCandidates);
            mergeCandidates(frequentItemSets, newCandidates);
            Dictionary<string, int> oldCandidates = newCandidates;

            while (oldCandidates.Count() > 0)
            {
                newCandidates = GenerateCandidates(oldCandidates, tags);
                Console.WriteLine("new candidates:");
                Filter(newCandidates);
                mergeCandidates(frequentItemSets, newCandidates);
                GenerateAssociations(newCandidates, frequentItemSets, associations);
                oldCandidates = newCandidates;
            }

        }

        private void GenerateAssociations(Dictionary<string, int> newCandidates, Dictionary<string, int> frequentItemSets, Dictionary<string, int> associations)
        {
            foreach (var item in newCandidates)
            {
                CreateAssociationItems(item, frequentItemSets, associations);
            }
        }

        private void CreateAssociationItems(KeyValuePair<string, int> item, Dictionary<string, int> frequentItemSets, Dictionary<string, int> associations)
        {
            string[] tokens = Utility.Tokenize(item.Key);
            string association = item.Key;

            List<string> rules = GetRules(item.Key);

            //int candidateSupport = getCandidateSupport(tokens);
        }

        private List<string> GetRules(string key)
        {
            List<string> rules = new List<string>();
            string[] tokens = Utility.Tokenize(key);
            //string association = Key;
            foreach (var token in tokens)
            {
                var rule = key.Replace(token, "") + " " + token;
                rule = rule.Replace("  ", " ").Trim();
                rules.Add(rule);
               
            }

            return rules;
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

        private Dictionary<string, int> GenerateCandidates(Dictionary<string, int> dic, List<string> tags)
        {
            Dictionary<string, int> newCandidates = new Dictionary<string, int>();
            int interSectCount = Utility.Tokenize(dic.Keys.ElementAt(0)).Length - 1;

            for (int i = 0; i < dic.Keys.Count; i++)
            {
                string key = dic.Keys.ElementAt(i);
                string[] words = Utility.Tokenize(dic.Keys.ElementAt(i));

                for (int j = i + 1; j < dic.Keys.Count; j++)
                {
                    CreateCandidate(dic, newCandidates, interSectCount, words, j, tags);
                }
            }

            return newCandidates;
        }

        private void CreateCandidate(Dictionary<string, int> dic, Dictionary<string, int> newCandidates, int interSectCount, string[] tags, int index, List<string> allTags)
        {
            string key = dic.Keys.ElementAt(index);
            string[] tags2 = Utility.Tokenize(key);
            int intersection = tags.Intersect(tags2).Count();
            if (interSectCount == intersection)
            {
                IEnumerable<string> newCandidate = tags.Union(tags2);
                string newCandidateStr = Utility.ArrayToString(newCandidate);
                int support = MeasureSupport(newCandidate, allTags);
                newCandidates.Add(newCandidateStr, support);
            }
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



    }

}