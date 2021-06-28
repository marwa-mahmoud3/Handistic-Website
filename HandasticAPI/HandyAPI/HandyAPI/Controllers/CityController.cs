using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using BL.Dto;
using BL.Services;
using BL.Interfaces;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICityService _cityService;
        public CityController(ApplicationDbContext context, IMapper mapper,ICityService cityService)
        {
            _context = context;
            _mapper = mapper;
            _cityService = cityService;
        }

        // GET: api/City
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityModel>>> GetCity()
        {
            var cities = await _context.City.ToListAsync();
            return _mapper.Map<CityModel[]>(cities);
        }

        // GET: api/City/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CityModel>> GetCities(int id)
        {
            var city = await _context.City.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }
            return _mapper.Map<CityModel>(city);

        }

        // PUT: api/City/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, CityModel cityModel)
        {
            if (id != cityModel.Id)
            {
                return BadRequest();
            }

            
            var result = _cityService.CityExistAsync(cityModel);
            if (result != "")
                return BadRequest("This City Exists");
            var city = await _context.City.FindAsync(id);
            _mapper.Map(cityModel, city);
            await _context.SaveChangesAsync();       
            return NoContent();
        }

        // POST: api/City
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CityModel>> PostCity(CityModel cityModel)
        {
            var city = _mapper.Map<City>(cityModel);
            _context.City.Add(city);
            var result = _cityService.CityExistAsync(cityModel);
            if (result!="")
                return BadRequest("This City Exists");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCity", new { id = city.Id }, cityModel);
        }

        // DELETE: api/City/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.City.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }

            _context.City.Remove(city);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CityExists(int id)
        {
            return _context.City.Any(e => e.Id == id);
        }
    }
}
