using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Serilog;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly QuestionService _questionService;
        private readonly UserService _userService;
        private readonly AnswerService _answerService;

        public HomeController(QuestionService questionService, UserService userService,
                                    AnswerService answerService)
        {
            _questionService = questionService;
            _userService = userService;
            _answerService = answerService;
        }

        [HttpPost("recommend/{iteration}/{userId}")]
        public ActionResult<List<QuestionInfo>> getInfo(string userId, int iteration = 0)
        {
            User user = _userService.Get(userId);
            Log.Information("user:"+user.id);
            List<Question> list = _questionService.recommend(user, iteration);
            List<QuestionInfo> questionInfoList = new List<QuestionInfo>();

            foreach (Question q in list)
            {
                QuestionInfo info = new QuestionInfo();
                info.user = _userService.Get(q.userId);
                info.answerCount = _answerService.GetByQuestion(q.id).Count;
                info.question = q;
                questionInfoList.Add(info);
            }

            return questionInfoList;


        }

    }
}