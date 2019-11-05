using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;


namespace ForumApi.Services
{
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

        public Recommendation GetFirst() =>
            _recommendations.Find(Recommendation => true).FirstOrDefault();

        public Recommendation Create(Recommendation recommendations)
        {
            _recommendations.InsertOne(recommendations);
            return recommendations;
        }

        public void Update(string id, Recommendation recommendationIn) =>
            _recommendations.ReplaceOne(document => document.id == id, recommendationIn);

        public void Remove(Recommendation recommendationIn) =>
            _recommendations.DeleteOne(document => document.id == recommendationIn.id);

        public void Remove(string id) =>
            _recommendations.DeleteOne(recommendationItem => recommendationItem.id == id);
        
        public void UpdateFirst(Recommendation recommendation){
            Console.WriteLine("updating recommendations");
            Recommendation firstDocument = GetFirst();
            if(firstDocument == null) Create(recommendation);
            else{
                recommendation.id = firstDocument.id;
                Update(firstDocument.id, recommendation);
            }
        }
    }

}