
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;

        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }


        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        //[HttpGet("getbyuser/{id}")]
        //public IActionResult GetByUser(int id)
        //{
        //    return Ok(_postRepository.GetByUserProfileId(id));
        //}

        //[HttpPost]
        //public IActionResult Post(Post post)
        //{
        //    _postRepository.Add(post);
        //    return CreatedAtAction("Get", new { id = post.Id }, post);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Post post)
        //{
        //    if (id != post.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _postRepository.Update(post);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _postRepository.Delete(id);
        //    return NoContent();
        //}

        ////https://localhost:5001/api/post/search?q=p&sortDesc=false
        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_postRepository.Search(q, sortDesc));
        //}

        ////https://localhost:5001/api/post/hottest?since=2020-06-29
        //[HttpGet("hottest")]
        //public IActionResult Hottest(string since)
        //{
        //    return Ok(_postRepository.Hottest(since));
        //}
    }
}