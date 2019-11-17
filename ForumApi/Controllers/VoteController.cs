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
        [HttpGet("{postId:length(24)}/{userId}/{postType}")]
        public ActionResult<int> Get(string postId, string userId, string postType)
        {
            Vote vote = _voteSurvice.Get(postId, userId, postType);
            if(vote == null) return 0;
            else if(vote.isUpvote) return 1;
            return -1;
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

            var insertedVote = _voteSurvice.InsertOne(vote);
            if(insertedVote == null) return BadRequest();

            return CreatedAtRoute("GetVote", new { id = insertedVote.id.ToString() }, insertedVote);
        }
        

    }
}