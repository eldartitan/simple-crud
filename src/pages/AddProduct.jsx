/** @format */

import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/ProductsSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileUploader from "../components/FileUpLoader";


export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const list = useSelector((state) => state.products.list);

  const options = ["Active", "Disable"];
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);
  const [allPrice, setAllPrice] = useState("");

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [media, setMedia] = useState([]);
  const [status, setStatus] = useState(options[0]);
  const [priceList, setPriceList] = useState([
    { city: "Almaty", price: allPrice },
    { city: "Astana", price: allPrice },
  ]);

  const handleChangePrice = (e) => {
    if (e.target.value > -1) {
      setAllPrice(e.target.value);
      setPriceList(
        priceList.map((pr) => ({ city: pr.city, price: e.target.value })),
      );
    }
  };

  const handleChangePriceCity = (val, pr) => {
    if (val > -1) {
      const i = priceList.indexOf(pr);
      const copy = [...priceList];
      copy[i]["price"] = val;
      setPriceList(copy);
    }
  };

  const handleClick = () => {
    if (
      name === "" ||
      media.length === 0 ||
      priceList.filter((f) => f.price === "").length
    ) {
      setError(true);
    } else {
      dispatch(
        addProduct({
          id: list.length ? list[list.length-1].id+1 : 1,
          name,
          description: value,
          status,
          price: priceList,
          media,
        }),
      );
      navigate("/");
    }
  };

  const handleMedia = (imageURL) => {
    setMedia([...media, imageURL]);
  };

  const mediaFilter = (index) => {
    const copy = media.filter((f, fIndex) => fIndex)
    setMedia(copy)
  }

  return (
    <>
      <div className={"my-3"}>
        <Link to={"/"}>Назад</Link>
      </div>
      <Form>
        <Form.Label>Название</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
        <Form.Label>Описание</Form.Label>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "300px" }}
        >
          {options.map((op, index) => (
            <option key={`${op}__${index}`} value={op}>
              {op}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Медиа</Form.Label>
        <div>
          <FileUploader handleMedia={handleMedia} />
          <div className="d-flex flex-column gap-3">
            {media?.map((img, index) => 
              <div key={`img__${index}`}>
                <img width={300} src={img} alt="preview" />
                <button onClick={() => mediaFilter(index)}>Удалить</button>
              </div>
              )}
          </div>
        </div>
        <Form.Label>Цена</Form.Label>
        <Form.Group className="d-flex gap-3">
          <Form.Check value={check} onChange={() => setCheck(!check)} />
          <Form.Label>Одна цена на всех</Form.Label>
          {check ? (
            <Form.Control
              style={{ width: "300px" }}
              type="number"
              value={allPrice}
              onChange={(e) => handleChangePrice(e)}
              required
            />
          ) : (
            <Form.Control
              style={{ width: "300px" }}
              value={allPrice}
              disabled
            />
          )}
        </Form.Group>
        <Form.Group className="d-flex flex-column justify-content-between mt-3">
          {!check
            ? priceList.map((pr, index) => (
              <div key={`${pr.city}__${index}`}>
                  <Form.Label>{pr.city}</Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    type="number"
                    value={pr.price}
                    onChange={(event) =>
                      handleChangePriceCity(event.target.value, pr)
                    }
                  />
                </div>
              ))
            : null}
        </Form.Group>
        {error ? <Alert className="mt-3">Заполните все поля!</Alert> : null}
      </Form>
      <Button onClick={handleClick} className={"mt-3"}>
        Сохранить
      </Button>
    </>
  );
}
