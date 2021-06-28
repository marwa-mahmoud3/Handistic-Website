
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.Dto;
using BL.AppServices;
using DAL.Models;
using AutoMapper;
using BL.Services;
using Microsoft.EntityFrameworkCore;
using BL.Interfaces;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        public CategoryController(ApplicationDbContext context, IMapper mapper, ICategoryService categoryService)
        {
            _context = context;
            _mapper = mapper;
            _categoryService = categoryService;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategory()
        {
            var categories = await _context.Categories.ToListAsync();
            return _mapper.Map<CategoryModel[]>(categories);
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryModel>> GetCategories(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }
            return _mapper.Map<CategoryModel>(category);

        }

        // PUT: api/category/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcategory(int id, CategoryModel categoryModel)
        {
            if (id != categoryModel.Id)
            {
                return BadRequest();
            }


            var result = _categoryService.CategoryExistAsync(categoryModel);
            if (result != "")
                return BadRequest("This Category Exists");
            var category = await _context.Categories.FindAsync(id);
            _mapper.Map(categoryModel, category);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryModel>> PostCategory(CategoryModel categoryModel)
        {
            var category = _mapper.Map<Category>(categoryModel);
            _context.Categories.Add(category);
            var result = _categoryService.CategoryExistAsync(categoryModel);
            if (result != "")
                return BadRequest("This Category Exists");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, categoryModel);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }


    }
}
