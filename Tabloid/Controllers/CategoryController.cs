using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpGet("getbyuser")]
        public IActionResult GetByUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_categoryRepository.GetByFirebaseUserId(firebaseUserId));
        }
    }
}