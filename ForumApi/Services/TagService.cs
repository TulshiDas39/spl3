using System;
using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace ForumApi.Services
{
    public class TagSurvice
    {

        QuestionService _questionService;
        private readonly IMongoCollection<TagItem> _tags;

        public TagSurvice(IDatabaseSettings settings,
        QuestionService questionService, AnswerService answerService,
        CommentService commentService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _tags = database.GetCollection<TagItem>(settings.TagItemsCollectionName);

            _questionService = questionService;
        }

        public TagItem GetItem(string id)
        {
            return _tags.Find(item => item.id == id).FirstOrDefault();
        }

        public List<TagInfo> GetTagInfoList(int skip, int limit)
        {
            List<TagInfo> list = new List<TagInfo>();
            List<TagItem> tagItemList = _tags.Find<TagItem>(item => true).SortByDescending(item => item.users).Skip(skip).Limit(limit).ToList();
            long timestampNow = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds() * 1000;
            long timestampPreviousWeek = timestampNow - 7 * 24 * 60 * 60 * 1000;
            long timestampForToday = timestampNow - 1 * 24 * 60 * 60 * 1000;

            foreach (var item in tagItemList)
            {
                TagInfo tagInfo = new TagInfo();
                tagInfo.tag = item;
                tagInfo.questionsInthisWeek = _questionService.GetQuestionsCountThisWeek(item.name, timestampPreviousWeek);
                tagInfo.questionsToday = _questionService.GetQuestionsCountThisWeek(item.name, timestampForToday);
                list.Add(tagInfo);
            }

            return list;
        }

        internal ActionResult<List<TagInfo>> GetSearchedTags(string match)
        {
            List<TagInfo> tags = new List<TagInfo>();
            int i = 0;
            int chunk = 60;
            List<TagItem> list;
            do
            {
                list = _tags.Find(item => true).Skip(i * chunk).Limit(chunk).ToList();
                Push(tags, list, match);
                if (tags.Count > 20) return tags;
            } while (list.Count == chunk);

            return tags;
        }

        internal ActionResult<List<string>> GetSuggestedTags(string match)
        {
            List<string> tags = new List<string>();
            int i = 0;
            int chunk = 60;
            List<TagItem> list;
            do
            {
                list = _tags.Find(item => true).Skip(i * chunk).Limit(chunk).ToList();
                Push(tags, list, match);
                if (tags.Count > 10) return tags;
            } while (list.Count == chunk);

            return tags;
        }

        private void Push(List<string> tags, List<TagItem> items, string match)
        {
            foreach (var item in items)
            {
                if (item.name.ToLower().StartsWith(match))
                {
                    tags.Add(item.name);
                    if (tags.Count > 10) return;
                }
            }
        }


        private void Push(List<TagInfo> tags, List<TagItem> items, string match)
        {
            foreach (var item in items)
            {
                if (item.name.ToLower().StartsWith(match))
                {
                    int weekMiliSecond = 7 * 24 * 60 * 60 * 1000;
                    int oneDayMiliSecond = 1 * 24 * 60 * 60 * 1000;
                    TagInfo tagInfo = new TagInfo();
                    tagInfo.questionsInthisWeek = _questionService.CountQuestionsAtTimeInterval(item.name,weekMiliSecond);
                    tagInfo.questionsToday = _questionService.CountQuestionsAtTimeInterval(item.name,oneDayMiliSecond);
                    tagInfo.tag = item;
                    tags.Add(tagInfo);
                    if (tags.Count > 10) return;
                }
            }
        }

        public TagItem InsertOne(TagItem tagItem)
        {
            _tags.InsertOne(tagItem);
            return tagItem;
        }

    }
}