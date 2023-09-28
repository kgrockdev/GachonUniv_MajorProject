use Community

Create table communitypost (
	communityPostCode int IDENTITY (1, 1) primary key,
	communityPostName nvarchar(50) not null,
	communityPostContent nvarchar(500) not null,
	communityPostUser nvarchar(20) not null,
	communityPostTime datetime DEFAULT GETDATE(),
	communityPostView int default 0,
	communityPostRecommand int default 0,
	communityCode int not null,
	communityPostAuth nvarchar(20),
	communityPostPassword nvarchar(20)
)

select * from communitypost

drop table communitypost

alter table communitypost alter column communityPostPassword nvarchar(20) null

delete from communitypost where communityPostCode = 2

select * from communitypost where communityPostUser = 'linsyay'

UPDATE communitypost SET communityPostName=N'삭제테스트2', communityPostContent='123', communityPostUser='linsyay', communityPostPassword='' where communityPostCode=1004

insert into communitypost (communityPostName, communityPostContent, communityPostUser, communityCode, communityPostAuth) values(N'ASP 프로그래밍에 관한 커뮤니티입니다.', N'안녕하세요 관리자입니다. ASP 프로그래밍에 관한 게시판을 신설하였습니다.', N'root', 1, 'user')