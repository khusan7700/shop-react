import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
// import { useHistory } from "react-router-dom";
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
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const history = useHistory();
  const navigate = useNavigate();

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose(); // basket avval close bo'ladi
      if (!authMember) throw Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll(); // basket productlardan tozalanadi

      // REFRESH VIA CONTEXT
      setOrderBuilder(new Date()); // refresh order page
      // history.push("/orders");
      navigate("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          className={"basket-blue"}
          badgeContent={cartItems.length}
          color="secondary"
        >
          <img
            className="basket-icon"
            alt="img"
            width={"40px"}
            height={"40px"}
            color={"white"}
            src={"/basket-blue.png"}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "#1a237e",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#1a237e",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Cart Products:</div>
                <RestoreFromTrashIcon
                  sx={{ ml: "10px", color: "red", cursor: "pointer" }}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        onClick={() => onDelete(item)}
                        color={"primary"}
                      />
                    </div>
                    <img src={imagePath} className={"product-img"} alt="img" />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 100 }}>
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
              </span>
              <Button
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                onClick={proceedOrderHandler}
              >
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
function setOrderBuilder(arg0: Date) {
  throw new Error("Function not implemented.");
}
