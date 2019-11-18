using System;
using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

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

        public List<TagInfo> GetTagInfoList(int skip, int limit)
        {
            List<TagInfo>list = new List<TagInfo>();
            List<TagItem> tagItemList = _tags.Find<TagItem>(item => true).SortByDescending(item => item.users).Skip(skip).Limit(limit).ToList();
            long timestampNow = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds() * 1000;
            long timestampPreviousWeek = timestampNow - 7 * 24 * 60 * 60 * 1000;
            long timestampForToday = timestampNow - 1 * 24 * 60 * 60 * 1000;
            
            foreach(var item in tagItemList){
                TagInfo tagInfo = new TagInfo();
                tagInfo.tag = item;
                tagInfo.questionsInthisWeek =  _questionService.GetQuestionsCountThisWeek(item.name, timestampPreviousWeek);
                tagInfo.questionsToday =  _questionService.GetQuestionsCountThisWeek(item.name, timestampForToday);
                list.Add(tagInfo);
            }

            return list;
        }

        public TagItem InsertOne(TagItem vote)
        {   
            throw new NotImplementedException();
        }

    }
}