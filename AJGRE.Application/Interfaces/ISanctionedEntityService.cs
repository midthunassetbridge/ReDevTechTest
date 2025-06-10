using AJGRE.Application.DTOs;
using ajgre_technical_interview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AJGRE.Application.Interfaces
{
    public interface ISanctionedEntityService
    {
        Task<IEnumerable<EntityDto>> ListAllAsync();
        Task<SanctionedEntity> AddAsync(EntityDto dto);
    }
}
