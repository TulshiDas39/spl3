using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;


namespace ForumApi.Services{
    public class RecommendationService
    {
        private readonly IMongoCollection<Recommendation> _recommendations;

        public RecommendationService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _recommendations = database.GetCollection<Recommendation>(settings.RecommendationCollectionName);
        }

        public List<Recommendation> Get() =>
            _recommendations.Find(Recommendation => true).ToList();

        public Recommendation Create(Recommendation recommendations)
        {
            _recommendations.InsertOne(recommendations);
            return recommendations;
        }
        public void Remove(Recommendation recommendationIn) =>
            _recommendations.DeleteOne(answer => answer.id == recommendationIn.id);

        public void Remove(string id) => 
            _recommendations.DeleteOne(recommendationItem => recommendationItem.id == id);
    }

}