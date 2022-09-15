/** @format */

import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../store/ProductsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products.list);

  const [search, setSearch] = useState("");
  const filtered = state.filter(f => f.name.includes(search))
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const pageDicrement = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const pageIncrement = () => {
    if (currentPage !== Math.ceil(filtered.length/5)) {
      setCurrentPage(currentPage + 1)
    }
  }
  console.log()
  return (
    <div>
      <div className={"my-3"}>
        <Link to={"/add"}>Добавить</Link>
      </div>
      <Form className="d-flex my-2">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check />
            </th>
            <th>Image</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Цена</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice((currentPage-1)*5, currentPage*5).map((pr) => (
            <tr key={pr.id}>
              <td>
                <Form.Check />
              </td>
              <td>
                <img src={pr.media[0]} width={50} alt="product" />
              </td>
              <td>{pr.name}</td>
              <td>{pr.status}</td>
              <td>{pr.price[0].price}</td>
              <td>
                <Link to={"/edit/" + pr.id}>Редактировать</Link>
              </td>
              <td>
                <Button onClick={() => handleClick(pr.id)} variant="link">
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex gap-3">
        <Button onClick={pageDicrement}>Назад</Button>
        <span>{ currentPage }</span>
        <Button onClick={pageIncrement}>Вперед</Button>
      </div>
    </div>
  );
}
