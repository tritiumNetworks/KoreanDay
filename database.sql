create user koreanday@localhost;
create schema koreanday;
use koreanday;

grant all privileges on koreanday.* to koreanday@localhost;

create table users (
  id varchar(20) not null,
  many int default 0 not null
);
