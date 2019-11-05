using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace ForumApi.Services
{
    public class BackgroundServices : IHostedService, IDisposable
    {
        private int executionCount = 0;
        private readonly ILogger _logger;
        private Timer _timer;
        private QuestionRecommendation _recommender;

        public BackgroundServices(ILogger<BackgroundServices> logger, QuestionRecommendation recommender)
        {
            _logger = logger;
            _recommender = recommender;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(5));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            executionCount++;

            _logger.LogInformation(
                "Timed Hosted Service is working. Count: {Count}", executionCount);
            _recommender.PrepareRecommendations();
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}