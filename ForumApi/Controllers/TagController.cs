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
    public class TagController : ControllerBase
    {
        private TagSurvice _tagSurvice;
        private readonly ILogger _logger;

        private readonly int chunkSize = 20;

        public TagController(TagSurvice tagSurvice, ILogger<TagController> logger)
        {
            _tagSurvice = tagSurvice;
            _logger = logger;
        }

        [HttpGet("suggest/{match}")]
        public ActionResult<List<string>> GetSuggested(string match){
            return _tagSurvice.GetSuggestedTags(match.ToLower());
        }


        [HttpGet("{iteration?}")]
        public ActionResult<List<TagInfo>> Get(int iteration=0)
        {
            return _tagSurvice.GetTagInfoList(iteration*chunkSize,chunkSize);
        }

        [Authorize]
        [HttpPost]
        public ActionResult<TagItem> Create(TagItem tag)
        {

            _logger.LogDebug("inside method:");

            var insertedTag = _tagSurvice.InsertOne(tag);
            if(insertedTag == null) return BadRequest();

            return CreatedAtRoute("GetTag", new { id = insertedTag.id.ToString() }, insertedTag);
        }
        

    }
}