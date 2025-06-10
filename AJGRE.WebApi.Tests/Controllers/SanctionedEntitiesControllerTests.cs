using AJGRE.Application.DTOs;
using AJGRE.Application.Interfaces;
using AJGRE.Application.Services;
using ajgre_technical_interview.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace AJGRE.WebApi.Tests.Controllers
{
    public class SanctionedEntitiesControllerTests
    {
        [Fact]
        public async Task ListAll_Returns_Ok()
        {
            var dtos = new List<EntityDto> { new EntityDto(System.Guid.NewGuid(), "X", "Y", true) };
            var mockSvc = new Mock<ISanctionedEntityService>(MockBehavior.Strict);
            mockSvc.Setup(s => s.ListAllAsync()).ReturnsAsync(dtos);
            var ctrl = new SanctionedEntitiesController(mockSvc.Object);

            var result = await ctrl.ListAll();

            result.Result.Should().BeOfType<OkObjectResult>();
            (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(dtos);
        }
    }
}
