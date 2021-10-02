# p5 Games collection - web portal
Micro web site to share games made with p5.

## Contribution guidelines.
If you find a bug with the project, open a case in the Issues section of this repository. Do not open a case if it is related to the operation of the server where this website is hosted, in that case contact the developer directly. 

If you want to contribute code, make sure that when you make a pull request you have worked on the most recent version of the project. Changes are not allowed unless they are well documented in the commit.

Note that if you are going to test with a database you will need to connect a local one of your own.

If you want to suggest a new website design, contact the developer directly.

## Technologies.
The technologies used in this project are:
* Server: Node.js with Express.
* Database: PostgreSQL.
* View engine: Handlebars with [HBS](https://www.npmjs.com/package/hbs 'hbs package').

### Database.
If you are going to contribute to the project and want to do tests involving the database, you will have to create one locally.
#### Schema for reference.
![db_schema](https://live.staticflickr.com/65535/51533269076_47ffc39e52_c.jpg)

#### Create the *users* table.
```
create table users
(
    user_id   serial
        constraint users_pk
            primary key,
    user_name varchar(15)           not null,
    pswd      varchar(100)          not null,
    names     varchar(80)           not null,
    lastnames varchar(80)           not null,
    is_active boolean default false not null
);
```
#### Create the *activation_codes* table.
```
create table activation_codes
(
    user_id integer      not null
        constraint activation_codes_users_user_id_fk
            references users
            on delete cascade,
    code    varchar(100) not null
);
```
#### Create the *games* table.
```
create table games
(
    game_id      serial
        constraint games_pk
            primary key,
    user_id      integer      not null
        constraint games_users_user_id_fk
            references users
            on update cascade on delete cascade,
    game_name    varchar(50)  not null,
    description  varchar(350) default 'Game made with p5',
    game_url     varchar(200) not null,
    cover_image  varchar(80)  not null,
    release_year integer      not null
);
```

## Transparency. 
The code that runs on the server is also open source and is the same that you find in this repository. To see the code on the server, please go here: https://replit.com/@ACSG/p5-Games

