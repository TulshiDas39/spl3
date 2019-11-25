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
    public class VotesController : ControllerBase
    {
        private VoteService _voteService;
        private QuestionService _questionService;
        private AnswerService _answerService;
        private UserService _userService;

        private CommentService _commentService;

        private SharedService _sharedService;
        private readonly ILogger _logger;

        public VotesController(VoteService voteSurvice,QuestionService questionService,
         AnswerService answerService, UserService userService,CommentService commentService,
         SharedService sharedService,
         ILogger<AnswersController> logger)
        {
            _voteService = voteSurvice;
            _questionService = questionService;
            _answerService = answerService;
            _userService = userService;
            _commentService = commentService;
            _sharedService = sharedService;
            
            _logger = logger;
        }

        [Authorize]
        [HttpGet("{postId:length(24)}/{userId}/{postType}")]
        public ActionResult<int> Get(string postId, string userId, string postType)
        {
            Vote vote = _voteService.Get(postId, userId, postType);
            if(vote == null) return 0;
            else if(vote.isUpvote) return 1;
            return -1;
        }

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetVote")]
        public ActionResult<Vote> Get(string id)
        {
            Vote vote = _voteService.Get(id);
            if (vote == null) return NotFound();
            return vote;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Vote> Create(Vote vote)
        {
            int ratingIncreamenter = 1;

            if( _voteService.Exist(vote)){
                if(_voteService.IsSameVote(vote)) return BadRequest();
                vote = _voteService.Update(vote);
                ratingIncreamenter = 2;
            }
            else{
                vote = _voteService.InsertOne(vote);
                _logger.LogDebug("inserted vote:");
                _sharedService.PrintObject(vote);
            }
            _logger.LogDebug("printing object");
            _sharedService.PrintObject(vote);
            _sharedService.UpdateRatings(vote, ratingIncreamenter);
            _sharedService.UpdateUserPopularity(vote);

            return CreatedAtRoute("GetVote", new { id = vote.id.ToString() }, vote);
        }
        

    }
}