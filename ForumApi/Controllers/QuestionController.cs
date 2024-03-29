using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {

        private readonly QuestionService _questionService;
        private readonly UserService _userService;
        private readonly TagService _tagService;

        private readonly int questionCount = 20;

        private readonly ILogger _logger;

        public QuestionsController(QuestionService questionService, UserService userService, TagService tagService,
         ILogger<QuestionsController> logger)
        {
            _questionService = questionService;
            _userService = userService;
            _tagService = tagService;
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

        [HttpGet("search/{query}")]
        public ActionResult<List<Question>> Search([FromServices] QuestionSimilarity similarity, string query){
            return similarity.getSimilarQuestions(query);
        }

        [HttpGet("popular/{userId}")]
        public ActionResult<List<Question>> GetPopular(string userId){
            if(!_userService.Exist(userId)) return BadRequest();
            User user = _userService.Get(userId);
            var tags = Utility.Tokenize(user.tags);
            return _questionService.GetPopularQuestionsThisWeek(tags);

        }

        [HttpGet("popular")]
        public ActionResult<List<Question>> GetPopular(){
            return _questionService.GetPopularQuestionsThisWeek();
        }


        [Authorize]
        [HttpGet("similarity/{questionData}")]
        public ActionResult<List<Question>> GetSimilarQuestions([FromServices] QuestionSimilarity similarity, string questionData)
        {
            _logger.LogDebug("question data:");
            _logger.LogDebug(questionData);
            return similarity.getSimilarQuestions(questionData, true);
        }

        [HttpGet("answerless/{iteration}")]
        public ActionResult<List<Question>> GetAnswerless(int iteration)
        {
            _logger.LogDebug("in answerless data:");
            return _questionService.getAnswerLessQuestions(iteration * questionCount, questionCount);
        }

        [HttpGet("countOfUser/{id}")]
        public ActionResult<int> GetQuestionCountByUser(string id){
            return _questionService.GetByUser(id).Count;
        }

        [HttpGet("get/{userId}")]
        public ActionResult<List<Question>> GetByUser(string userId)
        {
            return _questionService.GetByUser(userId);
        }

        [Authorize]
        [HttpGet("recommend/{userId}/{iteration}")]
        public ActionResult<List<Question>> RecommendQuestions(string userId, int iteration)
        {
            List<string> tags = Utility.Tokenize(_userService.Get(userId).tags).ToList();

            return _questionService.Recommend(userId, tags, iteration);
        }

        private void createUser(UserCredential user)
        {
            User user_data = new User();
            user_data.userId = user.sub;
            user_data.location = "";
            user_data.name = user.name;
            user_data.reputation = 0;
            user_data.tags = "";
            _userService.Create(user_data);
        }

        [HttpPut("view/{id:length(24)}")]
        public ActionResult CountView(string id)
        {
            _logger.LogDebug("question id to count view:" + id);
            Question question = _questionService.Get(id);
            if (question == null) return NotFound();
            _logger.LogDebug("updating views");
            question.views += 1;
            _questionService.Update(id, question);

            return Ok();
        }

        [Authorize]
        [HttpPut("upvote/{id:length(24)}")]
        public ActionResult UpVote(string id)
        {
            _logger.LogDebug("question id to count view:" + id);
            Question question = _questionService.Get(id);
            if (question == null) return NotFound();
            _logger.LogDebug("increamenting vote");
            question.ratings += 1;
            _questionService.Update(id, question);

            return Ok();
        }

        [Authorize]
        [HttpPut("downvote/{id:length(24)}")]
        public ActionResult DownVote(string id)
        {
            _logger.LogDebug("question id to count view:" + id);
            Question question = _questionService.Get(id);
            if (question == null) return NotFound();
            _logger.LogDebug("decreamenting vote");
            question.ratings -= 1;
            _questionService.Update(id, question);

            return Ok();
        }


        [Authorize]
        [HttpPost]
        public ActionResult<Question> Create(Question question)
        {
            _logger.LogDebug("in create question");
            if (question.id != null) return BadRequest();
            _questionService.Create(question);
            _tagService.InsertIfNotExist(question.tags);

            return CreatedAtRoute("GetQuestion", new { id = question.id.ToString() }, question);
        }

        [Authorize]
        [HttpPut]
        public IActionResult Update(Question question)
        {

            if (!_questionService.Exist(question))
            {
                return NotFound();
            }

            _questionService.Update(question.id, question);
            _tagService.InsertIfNotExist(question.tags);

            return Ok();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete([FromServices] AnswerService answerService, string id)
        {
            var question = _questionService.Get(id);

            if (question == null)
            {
                return NotFound();
            }
            answerService.RemoveMany(id);

            _questionService.Remove(question.id);

            return Ok();
        }
    }
}