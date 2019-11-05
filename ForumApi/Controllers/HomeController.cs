using ForumApi.Models;
using ForumApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using RestSharp;
using Microsoft.Extensions.Logging;


namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly QuestionService _questionService;
        private readonly UserService _userService;
        private readonly AnswerService _answerService;
        private readonly ILogger _logger;

        public HomeController(QuestionService questionService, UserService userService,
                                    AnswerService answerService, ILogger<HomeController> logger)
        {
            _questionService = questionService;
            _userService = userService;
            _answerService = answerService;
            _logger = logger;
            _logger.LogDebug("logger in HomeController:");
        }

        // [HttpPost("recommend/{iteration}/{userId}")]
        // public ActionResult<List<QuestionInfo>> getInfo(string userId, int iteration = 0)
        // {
        //     User user = _userService.Get(userId);
        //     //Log.Information("user:" + user.id);

        //     List<Question> list = _questionService.Recommend(userId, iteration);
        //     List<QuestionInfo> questionInfoList = new List<QuestionInfo>();

        //     foreach (Question q in list)
        //     {
        //         QuestionInfo info = new QuestionInfo();
        //         info.user = _userService.Get(q.userId);
        //         info.answerCount = _answerService.GetByQuestion(q.id).Count;
        //         info.question = q;
        //         questionInfoList.Add(info);
        //     }

        //     return questionInfoList;


        // }

        private string GetToken()
        {
            string clientId = "m1Mp422N3lPVdyDaxlsOuPRIQv4mssxc";
            string clientSecret = "1EIxRLI5jFL88_-NJ3dE3aDKqW4IbSYI_nC1mFYT1aW4ekNKCUqAFhVt6KI6tVf1";
            string audience = "https://dev-a7rj08r4.auth0.com/api/v2/";
            var client = new RestClient("https://dev-a7rj08r4.auth0.com/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret + "&audience=" + audience, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            _logger.LogDebug("response:");
            _logger.LogDebug(response.Content);
            return response.Content;
        }

        [HttpGet("token")]
        public ActionResult<string> GetAccessToken()
        {
            _logger.LogDebug("has come");
            string accessToken = GetToken();
            _logger.LogDebug("accessToken:");
            _logger.LogDebug(accessToken);
            return accessToken;
        }

        [HttpGet("users")]
        public ActionResult<string> GetAllUsers()
        {
            string accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EbEZOa1JDTWpkRVJFWTVSRVJGUWtWRE5EYzRSakU0TkVGRE5qQkVRa1UzTkRBMU9FRkROQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1hN3JqMDhyNC5hdXRoMC5jb20vIiwic3ViIjoibTFNcDQyMk4zbFBWZHlEYXhsc091UFJJUXY0bXNzeGNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWE3cmowOHI0LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTcyNDYwMTU5LCJleHAiOjE1NzI1NDY1NTksImF6cCI6Im0xTXA0MjJOM2xQVmR5RGF4bHNPdVBSSVF2NG1zc3hjIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.e3lO39Hqa1NbuUkVNF1dkfCFxpRnsrFRonWNCw0Zc_CVtZP56xEK0CiqAL3C6CV57b5NKPVhfLlLD7VjqxclZ39GAqY5W6O3UXiQpo3kOExor_MHmMX_Qw-MBLOUVabR5msPdMSm60PS6rFQKvFdFRkuxYQZue9pqrjYbu5vG-wDAso8Qo5pjhG3w1o0DKPuhucaFUxkfSaW3q8_JmpJWIFqlXWbIuV4Lo-3zLiK2DOGcoUVFPWt_kaUw3xyezwTWZ-cUZxwOs4xNwxFosi_QcUNN8-qETyn4tp6kkGiRn56MmcU3qySFWCbQj8iFkByJqJ7d8jELW-eI4ZQ_-LivA";
            var client = new RestClient("https://dev-a7rj08r4.auth0.com/api/v2/users?q=email%3A%22tulshidas37%40gmail.com%22&search_engine=v3");
            var request = new RestRequest(Method.GET);
            request.AddHeader("authorization", "Bearer " + accessToken);
            IRestResponse response = client.Execute(request);
            _logger.LogDebug("userInfo:");
            _logger.LogDebug(response.Content);
            return response.Content;
        }

    }
}