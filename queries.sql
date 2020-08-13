-- Multi-Table Query Practice


--Display the ProductName and CategoryName for all products in the database. Returns 77 records.
select ProductName, CategoryName
from product
join category
on product.CategoryId = category.id

--Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Returns 429 records.
select [order].id, companyName, orderdate
from [order]
join shipper
on [order].ShipVia = shipper.id
where [order].OrderDate < '2012-08-09'

--Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Returns 3 records.
select ProductName, Quantity
from Product
    join OrderDetail
    on Product.Id = OrderDetail.ProductId
    where Orderdatail.OrderId = '10251'
    order by product.ProductName;

--Display the OrderID, customer's Company Name and the employee's Last Name for every order. All columns should be labeled clearly. Returns 16,789 records.
select distinct orderid, companyname, lastname
from orderdetail
    join [order] , employee, customer
on orderdetail.orderid = [order].id and [order].EmployeeId = employee.id and [order].customerid = customer.id