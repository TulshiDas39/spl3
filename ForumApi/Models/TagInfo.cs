namespace ForumApi.Models
{
    public class TagInfo
    {
        public TagItem tag { get; set; }
        public int questionsInthisWeek { get; set; }
        public int questionsToday { get; set; }

    }
}