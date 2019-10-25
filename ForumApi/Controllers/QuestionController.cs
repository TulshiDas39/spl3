using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {

        private readonly QuestionService _questionService;
        private readonly UserService _userService;

        private readonly int questionCount = 20;

        private readonly ILogger _logger;

        public QuestionsController(QuestionService questionService, UserService userService, ILogger<QuestionsController> logger)
        {
            _questionService = questionService;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("latest/{iteration}")]
        public ActionResult<List<Question>> Get(int iteration = 0)
        {
            _logger.LogDebug("iteration:" + iteration);
            return _questionService.Get(iteration * questionCount, questionCount);
        }

        [HttpGet("{id:length(24)}", Name = "GetQuestion")]
        public ActionResult<Question> Get(string id)
        {
            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        [Authorize]
        [HttpPost("get/{userId}")]
        public ActionResult<List<Question>> getByUser(string userId)
        {
            return _questionService.GetByUser(userId);
        }

        [Authorize]
        [HttpPost("recommend/{iteration}")]
        public ActionResult<List<Question>> recommendToUser(IUserCredential userCred, int iteration = 0)
        {
            _logger.LogDebug("user AuthId:" + userCred.sub);
            _logger.LogDebug("iteration:" + iteration);
            User user = _userService.Get(userCred.sub);


            if (user == null)
            {
                createUser(userCred);

            }
            return _questionService.Get(iteration * questionCount, questionCount);
            //return _questionService.recommend(user, iteration);
        }

        private void createUser(IUserCredential user)
        {
            User user_data = new User();
            user_data.userId = user.sub;
            user_data.location = "";
            user_data.name = user.name;
            user_data.reputation = 0;
            user_data.tags = "";
            _userService.Create(user_data);
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Question> Create(Question question)
        {
            _logger.LogDebug("in create question");
            _questionService.Create(question);

            return CreatedAtRoute("GetQuestion", new { id = question.id.ToString() }, question);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Question questionIn)
        {
            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }

            _questionService.Update(id, questionIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }

            _questionService.Remove(question.id);

            return NoContent();
        }
    }
}