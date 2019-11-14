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
        private VoteSurvice _voteSurvice;
        private readonly ILogger _logger;

        public VotesController(VoteSurvice voteSurvice, ILogger<AnswersController> logger)
        {
            _voteSurvice = voteSurvice;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("{postId:length(24)}/{userId:length(24)}/{postType}")]
        public ActionResult<Vote> Get(string postId, string userId, string postType)
        {
            Vote vote = _voteSurvice.Get(postId, userId, postType);
            if (vote == null) return NotFound();
            return vote;
        }

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetVote")]
        public ActionResult<Vote> Get(string id)
        {
            Vote vote = _voteSurvice.Get(id);
            if (vote == null) return NotFound();
            return vote;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Vote> Create(Vote vote)
        {

            _logger.LogDebug("inside method:");

            if (vote.id != null)
            {
                _logger.LogDebug("bad requstion for id");
                _logger.LogDebug(vote.id);
                return BadRequest();
            }
            if (_voteSurvice.Get(vote.postId, vote.userId, vote.postType) != null)
            {
                _logger.LogDebug("vote exist");
                return BadRequest();
            }
            _voteSurvice.InsertOne(vote);

            return CreatedAtRoute("GetVote", new { id = vote.id.ToString() }, vote);
        }

    }
}