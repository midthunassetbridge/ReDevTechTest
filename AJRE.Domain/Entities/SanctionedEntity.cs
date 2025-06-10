namespace ajgre_technical_interview.Models
{
    public class SanctionedEntity
    {
        public Guid Id { get; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Domicile { get; set; } = string.Empty;
        public bool Accepted { get; set; }


    }
}
