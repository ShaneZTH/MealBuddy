//AUTHOR: MIHIR MESIA
import { useState, useEffect } from "react";
import OrderComponent from "./order-component";
import default_img from "../../images/wishlist-empty.jpeg";
import Logo from "../header/logo";
import "../../Reused.css";
import "./pastOrder.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PastOrders() {
  const [past_orders, setPastOrders] = useState([]);

  useEffect(() => {
    async function fetch_data() {
      const user_name = await fetch("/api/Account/getUser");
      const user = await user_name.json();
      const fetched_data = await fetch("/api/fetch_recent_orders/" + user.user);
      const data = await fetched_data.json();
      const cart = [];
      data.map((element) => {
        element.orders.map((e) => {
          e.cart.map((cart_data) => {
            cart.push(cart_data);
          });
        });
      });
      setPastOrders(cart);
    }
    fetch_data();
  }, []);

  //   async function deleteData(pid) {
  //     let arr = [...wishlist];

  //     arr = arr.filter((e) => e.pid != pid);
  //     setWishlist(arr);
  //     const user_name = await fetch("/api/Account/getUser");
  //     const user = await user_name.json();
  //     let delete_data = {
  //       user: user.user,
  //       pid: pid,
  //     };

  //     const headers = new Headers({ "Content-Type": "application/json" });

  //     const opts = {
  //       method: "delete",
  //       headers: headers,
  //       body: JSON.stringify(delete_data),
  //     };

  //     const resp = await fetch("/api/deleteWishlist", opts);
  //     if (resp.status !== 200) {
  //       alert("unable to delete");
  //     }
  //   }

  return (
    <div className="content_block">
      <Logo />
      <div className="order_mainarea">
        <h1>Order History</h1>

        <div className="orders_data_list">
          {past_orders.length == 0 ? (
            <div>
              <img src={default_img} alt="no_orders" />
            </div>
          ) : (
            past_orders.map((element) => {
              return <OrderComponent data={element} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
