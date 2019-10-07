
namespace ForumApi.Models
{
    public class QuestionInfo
    {
        public User User { get; set; }

        public int AnswerCount { get; set; }

        public Question Question { get; set; }
    }
}