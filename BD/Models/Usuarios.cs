﻿using System;
using System.Collections.Generic;

namespace BD.Models
{
    public partial class Usuarios
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? Estado { get; set; }
    }
}
