using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BD.Models;
using BD.ViewModels;

namespace BL.Seguridad
{
    public class BLSeguridad
    {
        public GenericResponse<LoginResponse> CheckUserPass(string username, string password)
        {
            try
            {
                var db = new SisporDatabaseContext();
                var user = db.Usuarios.Where(x => x.Email == username && x.Password == password);
                if (user.Count() > 0)
                    return new GenericResponse<LoginResponse>()
                    {
                        Code = 200,
                        Result = new LoginResponse()
                        {
                            Response = "Login Correcto.",
                            Estado = true,
                            username = username,
                            password = password,
                            IdUsuario = user.First().Id
                        }
                    };

                return new GenericResponse<LoginResponse>() { Code = 200, Result = new LoginResponse() { Response = "Login Incorrecto.", Estado = false } };
            }
            catch (Exception ex)
            {
                var message = ex.Message;
                var messageInner = ex.InnerException != null ? ex.InnerException.Message : "";

                SisporDatabaseContext db2 = new SisporDatabaseContext();
                db2.Log.Add(new Log() { Fecha = DateTime.Now, Ubicacion = "BLRecepcion", Mensaje = message, Detalle = messageInner });

                db2.SaveChanges();

                return new GenericResponse<LoginResponse>() { Code = 200, Result = new LoginResponse() { Response = "Login Incorrecto.", Estado = false } };
            }
        }
    }
}
