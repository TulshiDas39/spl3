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
        private double _minSupport = 0.5;

        private int _minSupportCount;

        public QuestionRecommendation(UserService userService, ILogger<QuestionSimilarity> logger)
        {
            _userService = userService;
            _logger = logger;
            _logger.LogDebug("initialising logger for question recommendation");
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
            // int iteration = 1;
            _minSupportCount = (int)(_minSupport * tags.Count);
            _logger.LogDebug("" + _minSupportCount);

            Dictionary<string, int> dic = GenerateCandidate(tags);
            bool isFiltered = Filter(dic);
            Dictionary<string, int> newCandidates = new Dictionary<string, int>();

            while (true)
            {
                if (!isFiltered) break;
                newCandidates = GenerateCandidate(dic);
                isFiltered = Filter(newCandidates);
            }

        }

        private bool Filter(Dictionary<string, int> dic)
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

            if (keys.Count == 0) return false;

            return true;

        }

        private Dictionary<string, int> GenerateCandidate(Dictionary<string, int> dic)
        {
            Dictionary<string, int> newCandidates = new Dictionary<string, int>();
            int interSectCount = Utility.GetWords(dic.Keys.ElementAt(0)).Length - 1;

            for(int i=0;i<dic.Keys.Count;i++)
            {
                string key = dic.Keys.ElementAt(i);
                string[] words= Utility.GetWords(dic.Keys.ElementAt(i));

                for(int j=i+1;j<dic.Keys.Count;j++){
                    string key2 = dic.Keys.ElementAt(j);
                    string[] words2 = Utility.GetWords(key2);
                    int intersection = words.Intersect(words2).Count();
                    string newStr = Utility.ArrayToString(words.Union(words2));
                    if(interSectCount == intersection) newCandidates.Add(newStr,0);
                }
                //Console.WriteLine("Key: {0}, Value: {1}", item.Key, item.Value);
            }

            MeasureSupport(newCandidates);

            return newCandidates;
        }

        private void MeasureSupport(Dictionary<string, int> newCandidates)
        {
            throw new NotImplementedException();
        }

        private Dictionary<string, int> GenerateCandidate(List<string> tags)
        {
            Dictionary<string, int> dic = new Dictionary<string, int>();

            tags.ForEach(tag =>
            {
                string[] items = Utility.GetWords(tag);
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