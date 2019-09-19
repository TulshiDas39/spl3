namespace ForumApi.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string UsersCollectionName { get; set; }

        public string QuestionsCollectionName { get; set; }

        public string AnswersCollectionName { get; set; }

        public string CommentsCollectionName { get; set; }

        public string TagItemsCollectionName { get; set; }

        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        public string UsersCollectionName { get; set; }

        public string QuestionsCollectionName { get; set; }

        public string AnswersCollectionName { get; set; }

        public string CommentsCollectionName { get; set; }

        public string TagItemsCollectionName { get; set; }

        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}