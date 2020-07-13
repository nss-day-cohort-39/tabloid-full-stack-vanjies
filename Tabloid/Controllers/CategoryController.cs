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

        [HttpGet ("getbyuser")]
        public IActionResult GetByUser () {
            var firebaseUserId = User.FindFirst (ClaimTypes.NameIdentifier).Value;
            return Ok (_categoryRepository.GetByFirebaseUserId (firebaseUserId));
        }
    }
}