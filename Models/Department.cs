using System;
using System.Collections.Generic;

#nullable disable

namespace Students.Models
{
    public partial class Department
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        public string Hodname { get; set; }
        public int? AllowedAdmissionCount { get; set; }
    }
}
