import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUser, updateUser } from "../store/DataHandle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const DashboardTable = () => {
  const { currentUser, allUserList } = useSelector((state) => state.data);
  const [selelctedId, setSelectedId] = useState("");
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);
    const fields = {
      name: formData?.name,
      email: formData?.email,
      contact: formData?.contact,
      userId: selelctedId,
    };
    // Implement logic to handle form submission (e.g., send data to backend)
    dispatch(updateUser(fields));
    setUpdate(false);
    setSelectedId("");
  };

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  React.useEffect(() => {
    dispatch(getAllUser());
  }, [allUserList?.length, update, selelctedId]);

  console.log(allUserList);

  const handleUpdate0 = (id) => {
    setSelectedId(id);
    setUpdate(true);
  };
  const handleDelete = (id) => {
    const fields = { userId: id };
    dispatch(deleteUser(fields));
    setSelectedId("");
  };
  const handleCancel = () => {
    setSelectedId("");
    setUpdate(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "50px",
          backgroundColor: "blue",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          <LogoutIcon style={{ color: "white" }} onClick={handleLogoutClick} />
        </span>
      </div>
      {!update && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUserList?.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.contact}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <BrowserUpdatedIcon
                      onClick={(e) => handleUpdate0(user?._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={(e) => handleDelete(user?._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {update && (
        <>
          <form
            onSubmit={handleUpdate}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1px",
              flexDirection: "column",
            }}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
            <br />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
            <br />

            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="Number" // Use "tel" for phone numbers (optional styling)
              id="contact"
              name="contact"
              onChange={handleChange}
              required
            />
            <br />

            <div style={{ display: "flex", gap: "20px" }}>
              <button type="submit">Update</button>
              <button onClick={(e) => handleCancel()}>Cancel</button>
            </div>
          </form>
        </>
      )}
      {!update && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            
            gap:"10px"
          }}
        >
            <h2>Add User: </h2>
          <Link to="/adding">
            <PersonAddIcon style={{fontSize:"40px",cursor: "pointer",}}/>
          </Link>
        </div>
      )}
    </>
  );
};

export default DashboardTable;
