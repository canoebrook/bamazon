DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
   item_id         INTEGER(10)   NOT NULL
  ,product_name    VARCHAR(50)   NOT NULL
  ,department_name VARCHAR(50)   NOT NULL
  ,price           DECIMAL(10,2) NOT NULL
  ,stock_quantity  INTEGER(10)   NULL
  ,product_sales   DECIMAL(10,2) NULL
  ,PRIMARY KEY (item_id)
);

CREATE TABLE departments (
   department_id     INTEGER(10)   NOT NULL
  ,department_name   VARCHAR(50)   NOT NULL
  ,over_head_costs   DECIMAL(10,2) NOT NULL
  ,PRIMARY KEY (department_id)
);

