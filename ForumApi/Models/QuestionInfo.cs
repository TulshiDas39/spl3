
namespace ForumApi.Models
{
    public class QuestionInfo
    {
        public User user { get; set; }

        public int answerCount { get; set; }

        public Question question { get; set; }
    }
}