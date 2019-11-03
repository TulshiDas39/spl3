namespace ForumApi.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string UsersCollectionName { get; set; }

        public string QuestionsCollectionName { get; set; }

        public string AnswersCollectionName { get; set; }

        public string CommentsCollectionName { get; set; }

        public string TagItemsCollectionName { get; set; }

        public string RecommendationCollectionName { get; set; }

        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        string UsersCollectionName { get; set; }

        string QuestionsCollectionName { get; set; }

        string AnswersCollectionName { get; set; }

        string CommentsCollectionName { get; set; }

        string TagItemsCollectionName { get; set; }
        string RecommendationCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}