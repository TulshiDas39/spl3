namespace ForumApi.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string QuestionsCollectionName { get; set; }
        public string AnswerCollectionName { get; set; }

        public string QuestionsCollectionName { get; set; }

        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        string BooksCollectionName { get; set; }
        string PensCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}