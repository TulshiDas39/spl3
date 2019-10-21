using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Serilog;
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

        public QuestionsController(QuestionService questionService, UserService userService)
        {
            _questionService = questionService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<Question>> Get(int iteration = 0) =>
            _questionService.Get(iteration*questionCount, questionCount);

        [HttpGet("{id}", Name = "GetQuestion")]
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
        [HttpGet("recommend/{iteration}/{userId}")]
        public ActionResult<List<Question>> recommendToUser(string userId, int iteration = 0)
        {
            // _logger.LogInformation("userId:"+userId);
            // _logger.LogInformation("iteration:"+iteration);
            Log.Information("userId:"+userId);
            Log.Information("iteration:"+iteration);

            User user = _userService.Get(userId);
            return _questionService.recommend(user, iteration);
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Question> Create(Question question)
        {
            _questionService.Create(question);

            return CreatedAtRoute("GetQuestion", new { id = question.Id.ToString() }, question);
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

            _questionService.Remove(question.Id);

            return NoContent();
        }
    }
}