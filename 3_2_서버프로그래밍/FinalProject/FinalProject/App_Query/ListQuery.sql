use Community

Create table communitylist (
	communityCode int IDENTITY (1, 1) primary key,
	communityName nvarchar(20) not null unique,
	communityDes nvarchar(100) not null,
)

select * from communitylist

drop table communitylist

insert into communitylist (communityName, communityDes) values(N'ASP 프로그래밍', N'ASP 프로그래밍에 대해 이야기를 나누는 커뮤니티입니다')
insert into communitylist (communityName, communityDes) values(N'ASP 프로그래밍 2', N'ASP 프로그래밍 커뮤니티 대피소')
insert into communitylist (communityName, communityDes) values(N'로스트아크', N'"여러분들의 근사한 모험이야말로 저희가 간절하게 꿈꾸는 추억입니다."')
insert into communitylist (communityName, communityDes) values(N'개발자들의 쉼터', N'모든 종류의 개발자들을 환영합니다')
insert into communitylist (communityName, communityDes) values(N'에픽세븐', N'스마일게이트의 모바일 게임 에픽세븐에 대한 이야기를 나눕니다')
insert into communitylist (communityName, communityDes) values(N'리그 오브 레전드', N'롤 좋아하시는 모든 분들 환영이오')

delete from communitylist where communityCode=1