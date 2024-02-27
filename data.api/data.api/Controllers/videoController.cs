using data.api.data;
using data.api.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace data.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class videoController : ControllerBase
    {
        private readonly AppDbContext appDbContext;

        public videoController(AppDbContext  appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] base6s4 base64)
        {

            var video = new video()
            {
                 base64 = base64.base64
            };
               await appDbContext.Videos.AddAsync(video);
         var res=   await appDbContext.SaveChangesAsync();
            return Ok(res);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> Get()
        {
            var videos = await appDbContext.Videos.ToListAsync();
            return Ok(videos);

        }
    }
    public class base6s4
    {
        public string base64 { get; set; }
    }
}
