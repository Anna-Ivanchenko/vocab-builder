import { useState, type MouseEvent } from "react";
import Popover from "@mui/material/Popover";
import Icon from "../Icon/Icon";
import css from "./ActionsBtn.module.css";

interface ActionsBtnProps {
  onEdit: () => void;
  onDelete: () => void;
}

const paperSx = {
  padding: "12px 24px",
  borderRadius: "15px",
  boxShadow: "0 4px 47px 0 rgba(18, 20, 23, 0.08)",
  backgroundColor: "#fff",
};

const ActionsBtn = ({ onEdit, onDelete }: ActionsBtnProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <button
        type="button"
        className={`${css.trigger} ${isOpen ? css.active : ""}`}
        onClick={handleOpen}
        aria-label="Word actions"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        ...
      </button>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: paperSx } }}
      >
        <ul className={css.list}>
          <li>
            <button type="button" className={css.item} onClick={handleEdit}>
              <Icon id="edit" size={16} className={css.icon} />
              Edit
            </button>
          </li>
          <li>
            <button type="button" className={css.item} onClick={handleDelete}>
              <Icon id="basket" size={16} className={css.icon} />
              Delete
            </button>
          </li>
        </ul>
      </Popover>
    </>
  );
};

export default ActionsBtn;
