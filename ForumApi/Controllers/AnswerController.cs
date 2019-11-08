using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly AnswerService _answerService;

        public AnswersController(AnswerService answerService)
        {
            _answerService = answerService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Answer>> Get() =>
            _answerService.Get();

        [HttpPost("get/{questionId}")]
        public ActionResult<List<Answer>> GetByQuestion(string questionId) =>
            _answerService.GetByQuestion(questionId);

        [HttpPost("{id}", Name = "GetAnswer")]
        public ActionResult<Answer> Get(string id)
        {
            var answer = _answerService.Get(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        //[Authorize]
        [HttpPost("create")]
        public ActionResult<Answer> Create(Answer answer)
        {
            if(answer.id == null) _answerService.Create(answer);
            else Update(answer.id, answer);

            return CreatedAtRoute("GetAnswer", new { id = answer.id.ToString() }, answer);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Answer answerIn)
        {
            var answer = _answerService.Get(id);

            if (answer == null)
            {
                return NotFound();
            }

            _answerService.Update(id, answerIn);

            return NoContent();
        }

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