using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers {
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase {
        private readonly CategoryRepository _categoryRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public CategoryController (ApplicationDbContext context) {
            _categoryRepository = new CategoryRepository (context);
            _userProfileRepository = new UserProfileRepository (context);
        }

        [HttpGet]
        public IActionResult Get () {
            return Ok (_categoryRepository.GetAll ());
        }

        [HttpPost]
        public IActionResult Post (Category category) {
            _categoryRepository.Add (category);
            return CreatedAtAction ("Get", new { id = category.Id }, category);
        }

        [HttpGet ("{id}")]
        public IActionResult Get (int id) {
            var category = _categoryRepository.GetById (id);
            if (category == null) {
                return NotFound ();
            }
            return Ok (category);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }

        // Currently, categories can only be deleted while not attached to a Post. Need a post repository method to pull the category by Id and remove the connection 

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }

    }
}