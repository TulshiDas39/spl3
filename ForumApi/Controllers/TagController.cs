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
        private TagService _tagSurvice;
        private readonly ILogger _logger;

        private readonly int chunkSize = 20;

        public TagController(TagService tagSurvice, ILogger<TagController> logger)
        {
            _tagSurvice = tagSurvice;
            _logger = logger;
        }

        [HttpGet("suggest/{match}")]
        public ActionResult<List<string>> GetSuggested(string match){
            return _tagSurvice.GetSuggestedTags(match.ToLower());
        }

        [HttpGet("search/{match}")]
        public ActionResult<List<TagInfo>> Search(string match){
            return _tagSurvice.GetSearchedTags(match.ToLower());
        }

        [HttpGet("{id:length(24)}", Name="GetTag")]
        public ActionResult<TagItem> Get(string id){
            var item = _tagSurvice.Get(id);
            if(item == null) return NotFound();
            return item;
        }

        [HttpGet("{iteration?}")]
        public ActionResult<List<TagInfo>> GetMany(int iteration=0)
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