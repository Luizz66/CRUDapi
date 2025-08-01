namespace List.Models
{
    public class TitleModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public TitleModel() { }

        public TitleModel(int id, string title)
        {
            Id = id;
            Title = title;
        }

        public void ChangeTitle(string title)
        {
            Title = title;
        }
    }
}
