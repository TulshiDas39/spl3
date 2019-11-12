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
    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        private readonly ILogger _logger;

        public CommentController(CommentService commentService, ILogger<CommentController> logger)
        {
            _commentService = commentService;
            _logger = logger;
        }

        [HttpGet("{id}", Name = "GetComment")]
        public ActionResult<Comment> Get(string id)
        {
            var comment = _commentService.Get(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Comment> Create(Comment comment)
        {

            if (comment.id != null) return BadRequest();
            _commentService.Create(comment);

            return CreatedAtRoute("GetComment", new { id = comment.id.ToString() }, comment);
        }

        [Authorize]
        [HttpPut("update")]
        public IActionResult Update(Comment comment)
        {

            if (!_commentService.Exist(comment))
            {
                return NotFound();
            }

            _commentService.Update(comment.id, comment);

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var comment = _commentService.Get(id);

            if (comment == null)
            {

                return NotFound();
            }

            _commentService.Remove(comment.id);

            return NoContent();
        }
    }
}