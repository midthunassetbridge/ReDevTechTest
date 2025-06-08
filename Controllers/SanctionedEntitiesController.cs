using AJGRE.Application.DTOs;
using AJGRE.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ajgre_technical_interview.Controllers
{
    [ApiController]
    [Route("api/sanctioned-entities")]
    public class SanctionedEntitiesController : ControllerBase
    {

        private readonly ISanctionedEntityService _service;
        public SanctionedEntitiesController(ISanctionedEntityService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityDto>>> ListAll()
        {
            var list = await _service.ListAllAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] EntityDto dto)
        {
            try
            {
                await _service.AddAsync(dto);
                return CreatedAtAction(nameof(ListAll), null);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}
