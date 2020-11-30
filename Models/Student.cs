using System;
using System.Collections.Generic;

#nullable disable

namespace Students.Models
{
    public partial class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public string Department { get; set; }
        public string DateOfAdmission { get; set; }
        public int? TutionFees { get; set; }
    }
}
