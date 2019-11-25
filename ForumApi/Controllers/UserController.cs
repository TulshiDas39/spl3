using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;



namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private ILogger _logger;

        public UsersController(UserService userService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("multiple/{iteration}")]
        public ActionResult<List<User>> Get(int iteration)
        {
            int chunkSize = 50;
            return _userService.Get(iteration * chunkSize, chunkSize);
        }

        [HttpGet("search/{match}")]
        public ActionResult<List<User>> Search(string match)
        {
            return _userService.GetSearchedUsers(match.ToLower());
        }


        [HttpGet("profile/{id:length(24)}")]
        public ActionResult<User> GetProfile(string id)
        {
            var user = _userService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Authorize]
        [HttpPut("follow/{tagId:length(24)}/{userId}")]
        public ActionResult FollowTag(string tagId, string userId)
        {
            _logger.LogDebug("has come");
            var isDone = _userService.follow(tagId, userId);
            if (!isDone) return NotFound();
            return Ok();
        }

        [Authorize]
        [HttpPut("unfollow/{tagId:length(24)}/{userId}")]
        public ActionResult UnFollowTag(string tagId, string userId)
        {
            _logger.LogDebug("has come");
            var isDone = _userService.Unfollow(tagId, userId);
            if (!isDone) return NotFound();
            return Ok();
        }

        [Authorize]
        [HttpPost("create")]
        public ActionResult<User> Create(UserCredential userCred)
        {
            if (!_userService.Exist(userCred.sub))
            {
                _logger.LogDebug("user not exist, creating the user");
                User user = new User();
                user.location = "";
                user.name = userCred.name;
                user.userId = userCred.sub;
                user.tags = "";
                user.reputation = 0;
                user.image = userCred.picture;
                _userService.Create(user);

                return CreatedAtRoute("GetUser", new { id = user.id.ToString() }, user);
            }

            _logger.LogDebug("user exist");
            User user2 = _userService.Get(userCred.sub);

            return user2;

        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.id);

            return NoContent();
        }
    }
}