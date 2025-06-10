using AJGRE.Application.DTOs;
using AJGRE.Application.Services;
using ajgre_technical_interview.Models;
using AJRE.Domain.Interfaces;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace AJGRE.Application.Tests.Services
{
    public class SanctionedEntityServiceTests
    {
        [Fact]
        public async Task ListAllAsync_Maps_Entities_To_EntityDto()
        {
            var entities = new List<SanctionedEntity>
        {
            new SanctionedEntity {Name = "A", Domicile = "X", Accepted = true },
            new SanctionedEntity { Name = "B", Domicile = "Y", Accepted = false }
        };
            var mockRepo = new Mock<ISanctionedEntityRepository>();
            mockRepo.Setup(r => r.GetSanctionedEntitiesAsync()).ReturnsAsync(entities);
            var svc = new SanctionedEntityService(mockRepo.Object);

            var dtos = (await svc.ListAllAsync()).ToList();

            dtos.Should().HaveCount(2);
            dtos[0].Id.Should().Be(entities[0].Id);
            dtos[0].Name.Should().Be("A");
        }

        [Fact]
        public async Task AddAsync_Throws_When_Name_Or_Domicile_Empty()
        {
            var mockRepo = new Mock<ISanctionedEntityRepository>();
            var svc = new SanctionedEntityService(mockRepo.Object);

            Func<Task> act = () => svc.AddAsync(new EntityDto(Guid.Empty, "", "", true));
            await act.Should().ThrowAsync<ArgumentException>();
        }

        [Fact]
        public async Task AddAsync_Throws_When_Duplicate()
        {
            var dto = new EntityDto(Guid.Empty, "Name", "Dom", true);
            var mockRepo = new Mock<ISanctionedEntityRepository>();
            mockRepo.Setup(r => r.ExistsAsync(dto.Name, dto.Domicile)).ReturnsAsync(true);
            var svc = new SanctionedEntityService(mockRepo.Object);

            Func<Task> act = () => svc.AddAsync(dto);
            await act.Should().ThrowAsync<InvalidOperationException>();
        }

        [Fact]
        public async Task AddAsync_Creates_Entity_When_Valid()
        {
            var dto = new EntityDto(Guid.Empty, "Name", "Dom", true);
            var mockRepo = new Mock<ISanctionedEntityRepository>();
            mockRepo.Setup(r => r.ExistsAsync(dto.Name, dto.Domicile)).ReturnsAsync(false);
            mockRepo.Setup(r => r.CreateSanctionedEntityAsync(It.IsAny<SanctionedEntity>()));
            var svc = new SanctionedEntityService(mockRepo.Object);

            await svc.AddAsync(dto);

            mockRepo.Verify(r => r.CreateSanctionedEntityAsync(
                It.Is<SanctionedEntity>(e => e.Name == dto.Name && e.Domicile == dto.Domicile)), Times.Once);
        }
    }
}
