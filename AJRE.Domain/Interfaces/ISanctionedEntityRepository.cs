using ajgre_technical_interview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AJRE.Domain.Interfaces
{
    public interface ISanctionedEntityRepository
    {
        Task<IList<SanctionedEntity>> GetSanctionedEntitiesAsync();
        Task<SanctionedEntity> GetSanctionedEntityByIdAsync(Guid id);
        Task<SanctionedEntity> CreateSanctionedEntityAsync(SanctionedEntity entity);
        Task<bool> ExistsAsync(string name, string domicile);
    }
}
