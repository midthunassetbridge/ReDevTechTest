using AJGRE.Application.DTOs;
using AJGRE.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ajgre_technical_interview.Controllers
{
    public class CounterController : Controller
    {
        private readonly CounterService _service;
        public CounterController(CounterService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<CounterDto>> GetCurrent()
        {
            var dto = await _service.GetCurrentAsync();
            return Ok(dto);
        }

        [HttpPost("increment")]
        public async Task<ActionResult<CounterDto>> Increment()
        {
            var dto = await _service.IncrementAsync();
            return Ok(dto);
        }
    }
}
