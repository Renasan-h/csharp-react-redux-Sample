using csharp_react_redux_Sample.Controllers.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace csharp_react_redux_Sample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PetsStatusController : ControllerBase
    {
        private readonly string[] AnimalKinds = new[]
        {
            "Dog", "Cat", "Dolphin", "Cow", "Rabbit", "Horse", "Wolf", "Platypus", "Fox", "Giraffe"
        };

        private static readonly string[] PetsNames = new[]
        {
            "Mimi", "Chacha", "Pochi", "Tama", "Shiro", "Cookie", "Marlon", "Momo", "Lulu", "Choco", "Hachi", "Pikachu", "Mocha", "Coco", "Mog", "Noah", "Hana", "Apple", "Sakura", "Bob"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public PetsStatusController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<PetsStatus> GetPetsStatus()
        {
            var rng = new Random();
            return Enumerable.Range(1, 50).Select(index => new PetsStatus
            {
                Date = DateTime.Now.AddDays(index),
                AnimalKind = AnimalKinds[rng.Next(AnimalKinds.Length)],
                Name = PetsNames[rng.Next(PetsNames.Length)],
                Temperature = rng.Next(10, 50),
            })
            .ToArray();
        }
    }
}
