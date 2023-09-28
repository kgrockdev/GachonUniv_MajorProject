use Community

Create table [user] (
	userID varchar(20) primary key,
	userPW varchar(16) not null,
	userName nvarchar(20) not null,
	userGender nvarchar(10) not null,
	userEmail varchar(30) not null
)

select * from [user]

insert into [user] values('root', 'root', N'관리자', N'선택 안함', 'myaspcommunity@gmail.com')

delete from [user] where userID='root'