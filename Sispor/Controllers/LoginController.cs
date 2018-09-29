using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BL.Seguridad;
using BD.ViewModels;
using System.IO;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Sispor.Helpers;
using System;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sispor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        //TODO: luego eliminar si las sesiones funcionan bien
        public Security sec = new Security();

        [HttpPost("[action]")]
        public JsonResult Do()
        {
            using (var mem = new MemoryStream())
            using (var reader = new StreamReader(mem))
            {
                Request.Body.CopyTo(mem);

                var body = reader.ReadToEnd();

                mem.Seek(0, SeekOrigin.Begin);

                Login data = (JsonConvert.DeserializeObject<Login>(reader.ReadToEnd()));
                
                BLSeguridad seguridad = new BLSeguridad();

                GenericResponse<LoginResponse> login = seguridad.CheckUserPass(data.user, data.password);
                if (login.Result.Estado == true)
                {
                    HttpContext.Session.SetString("usuario_userid", login.Result.IdUsuario.ToString());
                    HttpContext.Session.SetString("user", login.Result.username);
                }
                return Json(login);
            }
        }

        [HttpPost("[action]")]
        public JsonResult Navigate(string user, string id)
        {
            using (var mem = new MemoryStream())
            using (var reader = new StreamReader(mem))
            {
                Login data = new Login();
                var autHeader = (Request.Headers["Authentication"].ToString()).Split(';');
                if (autHeader.Length > 0)
                {
                    data.id = autHeader[0];
                    data.user = autHeader[1];
                }else
                {
                    Request.Body.CopyTo(mem);
                    var header = Request.Headers;

                    var body = reader.ReadToEnd();

                    mem.Seek(0, SeekOrigin.Begin);

                    data = (JsonConvert.DeserializeObject<Login>(reader.ReadToEnd()));
                }
                Validate(data.user, data.id);

                return Json("True");
            }
        }
        public void Validate(string u, string i)
        {
            try
            {
                var id = HttpContext.Session.GetString("usuario_userid").ToString().Trim();
                var user = HttpContext.Session.GetString("user").ToString().Trim();

                if (u != user || i != id)
                    throw new InvalidOperationException("_401");
            }
            catch (Exception)
            {
                throw new InvalidOperationException("401");
            }
        }
    }
}
