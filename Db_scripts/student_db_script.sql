USE [master]
GO
/****** Object:  Database [Student]    Script Date: 01-12-2020 00:24:21 ******/
CREATE DATABASE [Student]
GO
USE [Student]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 01-12-2020 22:24:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](200) NULL,
	[HODName] [nvarchar](200) NULL,
	[AllowedAdmissionCount] [int] NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 01-12-2020 22:24:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Age] [int] NULL,
	[Department] [nvarchar](200) NULL,
	[DateOfAdmission] [nvarchar](200) NULL,
	[TutionFees] [int] NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (24, N'CSE', N'JANAKI', 2)
INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (44, N'EEE', N'Vijay', 5)
INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (45, N'IT', N'Vasanthi', 10)
INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (46, N'ECE', N'Shankar', 6)
INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (47, N'CIVIL', N'INDU', 10)
INSERT [dbo].[Department] ([Id], [DepartmentName], [HODName], [AllowedAdmissionCount]) VALUES (48, N'MECH', N'Prema', 12)
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([Id], [Name], [Age], [Department], [DateOfAdmission], [TutionFees]) VALUES (22, N'Indumathi', 13, N'CSE', N'2020-11-15', 12)
INSERT [dbo].[Students] ([Id], [Name], [Age], [Department], [DateOfAdmission], [TutionFees]) VALUES (25, N'Ramy', 12, N'CSE', N'2020-11-12', 12)
INSERT [dbo].[Students] ([Id], [Name], [Age], [Department], [DateOfAdmission], [TutionFees]) VALUES (26, N'Ramesh', 10, N'EEE', N'2020-11-13', 123)
SET IDENTITY_INSERT [dbo].[Students] OFF
GO
