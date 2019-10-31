using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("create")]
        public ActionResult<User> Create(UserCredential userCred)
        {
            if (!_userService.Exist(userCred.sub))
            {
                User user = new User();
                user.location = "";
                user.name = userCred.name;
                user.userId = userCred.sub;
                user.tags = "";
                user.reputation = 0;
                _userService.Create(user);

                return CreatedAtRoute("GetUser", new { id = user.id.ToString() }, user);
            }

            User user2 = _userService.Get(userCred.sub);

            return user2;

        }

        [HttpPut("{id:length(24)}")]
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