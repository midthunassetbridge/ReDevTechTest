using AJGRE.Application.DTOs;
using AJGRE.Application.Interfaces;
using ajgre_technical_interview.Models;
using AJRE.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AJGRE.Application.Services
{
    public class SanctionedEntityService : ISanctionedEntityService
    {
        private readonly ISanctionedEntityRepository _repo;
        public SanctionedEntityService(ISanctionedEntityRepository repo) => _repo = repo;

        public async Task<IEnumerable<EntityDto>> ListAllAsync()
            => (await _repo.GetSanctionedEntitiesAsync())
                .Select(e => new EntityDto(e.Id, e.Name, e.Domicile, e.Accepted));

        public async Task<SanctionedEntity> AddAsync(EntityDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Domicile))
                throw new ArgumentException("Name and Domicile are required.");

            if (await _repo.ExistsAsync(dto.Name, dto.Domicile))
                throw new InvalidOperationException("Duplicate entity.");

            var entity = new SanctionedEntity
            {
                Name = dto.Name,
                Domicile = dto.Domicile,
                Accepted = dto.Accepted
            };
            return await _repo.CreateSanctionedEntityAsync(entity);
        }
    }
}
