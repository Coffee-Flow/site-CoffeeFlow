create user 'insertCoffeeFlow'@'localhost' identified by 'coffeeflow10';

grant INSERT on metricas.* to 'insertCoffeeFlow'@'localhost';

grant INSERT on coffeeflow.* to 'insertCoffeeFlow'@'localhost';

flush privileges;

create user 'adminCoffeeFlow'@'localhost' identified by 'coffeeflow10admin';

grant all privileges on metricas.* to 'adminCoffeeFlow'@'localhost';

grant all privileges on coffeeflow.* to 'adminCoffeeFlow'@'localhost';

flush privileges;