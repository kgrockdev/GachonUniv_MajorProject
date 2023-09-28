use Community

Create table comment (
	commentCode int IDENTITY (1, 1) primary key,
	commentPostCode int not null,
	commentUser nvarchar(20) not null,
	commentPassword nvarchar(20) not null,
	comment nvarchar(300) not null,
	commentAuth nvarchar(20) not null
)

select * from comment

drop table comment