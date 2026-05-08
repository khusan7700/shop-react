import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useNavigate } from "react-router-dom";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const navigate = useNavigate();

  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      navigate("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className="hover-line">
      {/* Trigger */}
      <IconButton
        id="basket-button"
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="basket-trigger-btn"
      >
        <Badge badgeContent={cartItems.length} className="basket-badge">
          <img src="/basket-blue.png" alt="cart" className="basket-icon" />
        </Badge>
      </IconButton>

      {/* Dropdown */}
      <Menu
        id="basket-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 8px 32px rgba(0,0,0,0.7))",
            mt: 1.5,
            bgcolor: "transparent",
            borderRadius: "16px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "#0f1130",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none",
              borderRight: "none",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="basket-frame">
          {/* Header */}
          <div className="basket-header">
            <div className="basket-header-left">
              <ShoppingCartIcon className="basket-header-icon" />
              <span className="basket-header-title">Your Cart</span>
              {cartItems.length > 0 && (
                <span className="basket-count-pill">{cartItems.length}</span>
              )}
            </div>
            {cartItems.length > 0 && (
              <button
                className="basket-clear-btn"
                onClick={() => onDeleteAll()}
              >
                <DeleteSweepIcon style={{ fontSize: 14 }} />
                Clear
              </button>
            )}
          </div>

          {/* Empty state */}
          {cartItems.length === 0 ? (
            <div className="basket-empty">
              <span className="basket-empty-icon">🛒</span>
              <p className="basket-empty-title">Cart is empty</p>
              <p className="basket-empty-sub">Add items to get started</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="orders-main-wrapper">
                <div className="orders-wrapper">
                  {cartItems.map((item: CartItem) => {
                    const imagePath = `${serverApi}/${item.image}`;
                    return (
                      <div className="basket-info-box" key={item._id}>
                        {/* Delete */}
                        <span
                          className="cancel-btn"
                          onClick={() => onDelete(item)}
                        >
                          <CancelIcon style={{ fontSize: 16 }} />
                        </span>

                        {/* Image */}
                        <img
                          src={imagePath}
                          className="product-img"
                          alt={item.name}
                        />

                        {/* Info */}
                        <div className="basket-item-info">
                          <span className="product-name">{item.name}</span>
                          <span className="product-price">
                            ${(item.price * item.quantity).toFixed(1)}
                          </span>
                        </div>

                        {/* Qty */}
                        <div className="basket-qty-controls">
                          <button
                            className="qty-btn minus"
                            onClick={() => onRemove(item)}
                          >
                            <RemoveIcon style={{ fontSize: 11 }} />
                          </button>
                          <span className="qty-num">{item.quantity}</span>
                          <button
                            className="qty-btn plus"
                            onClick={() => onAdd(item)}
                          >
                            <AddIcon style={{ fontSize: 11 }} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="basket-order">
                <div className="basket-price-breakdown">
                  <div className="bpb-row">
                    <span className="bpb-label">Subtotal</span>
                    <span className="bpb-val">${itemsPrice.toFixed(1)}</span>
                  </div>
                  <div className="bpb-row">
                    <span className="bpb-label">Delivery</span>
                    <span
                      className={`bpb-val ${shippingCost === 0 ? "free" : ""}`}
                    >
                      {shippingCost === 0 ? "Free 🎉" : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className="bpb-divider" />
                  <div className="bpb-row total">
                    <span className="bpb-total-label">Total</span>
                    <span className="bpb-total-val">${totalPrice}</span>
                  </div>
                </div>

                {shippingCost > 0 && (
                  <p className="basket-delivery-hint">
                    Add ${(100 - itemsPrice).toFixed(0)} more for free delivery
                  </p>
                )}

                <button
                  className="basket-order-btn"
                  onClick={proceedOrderHandler}
                >
                  <ShoppingCartIcon style={{ fontSize: 16 }} />
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </Menu>
    </Box>
  );
}
