using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly AnswerService _answerService;

        private readonly ILogger _logger;

        public AnswersController(AnswerService answerService, ILogger<AnswersController> logger)
        {
            _answerService = answerService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Answer>> Get() =>
            _answerService.Get();

        [HttpGet("countForUser/{userId}")]
        public ActionResult<int> GetCountForUser(string userId){
            return _answerService.GetByQuestion(userId).Count;
        }

        [HttpGet("list/{questionId:length(24)}")]
        public ActionResult<List<Answer>> GetByQuestion(string questionId) =>
            _answerService.GetByQuestion(questionId);

        [HttpGet("count/{questionId:length(24)}")]
        public ActionResult<int> GetAnswerCount(string questionId)
        {
            return _answerService.GetByQuestion(questionId).Count;
        }

        [HttpGet("{id}", Name = "GetAnswer")]
        public ActionResult<Answer> Get(string id)
        {
            var answer = _answerService.Get(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Answer> Create(Answer answer)
        {

            if (answer.id != null) return BadRequest();
            _answerService.Create(answer);

            return CreatedAtRoute("GetAnswer", new { id = answer.id.ToString() }, answer);
        }

        [Authorize]
        [HttpPut]
        public IActionResult Update(Answer answer)
        {

            if (!_answerService.Exist(answer))
            {
                return NotFound();
            }

            _answerService.Update(answer.id, answer);

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var answer = _answerService.Get(id);

            if (answer == null)
            {

                return NotFound();
            }

            _answerService.Remove(answer.id);

            return NoContent();
        }
    }
}