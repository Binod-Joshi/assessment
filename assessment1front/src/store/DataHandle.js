import { authRequest, authSuccess, authFailed, authError,authListOfUser, authLogout } from "./DataSlice";

export const loginUser = (fields) => async (dispatch) => {
    
  const { email,password} = fields;
  console.log(email, password);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/login`, {
      method: "post",
      body: JSON.stringify({ email, password }), // Fixed the payload
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if(result.email){
      dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(authError(error.message));
  }
};


export const RegisterUser = (fields) => async(dispatch) => {
  const {name, email, password,contact,data} = fields;
  console.log(name,email,password);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/register`,{
      method: "post",
      body:JSON.stringify({email,name,password,contact,data}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    if(data === "afterlogin"){
        dispatch(authListOfUser(result));
    }
    else if(result.email){
      dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error.message));
  }
}

export const updateUser = (fields,currentUser) => async(dispatch) => {
  const {name, email,contact,userId} = fields;
  console.log(name,email);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/users/${userId}`,{
      method: "put",
      body:JSON.stringify({email,name,contact}),
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${currentUser?.token}`,
      }
    });
    result = await result.json();
    if(result?.data?.email){
    //   dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error.message));
  }
}

export const getAllUser = () => async(dispatch) => {
    
    dispatch(authRequest());
    try {
      let result = await fetch(`http://localhost:5000/auth/users`,{
        method: "get",
        headers:{
          "Content-Type":"application/json"
        }
      });
      result = await result.json();
      console.log(result);
      if(result){
        dispatch(authListOfUser(result));
      }else{
        dispatch(authFailed(result.message));
      }
    } catch (error) {
      dispatch(authError(error.message));
    }
}


export const deleteUser = (fields) => async(dispatch) => {
    const {userId} = fields;
    dispatch(authRequest());
    try {
      let result = await fetch(`http://localhost:5000/auth/usersdelete/${userId}`,{
        method: "delete",
        headers:{
          "Content-Type":"application/json"
        }
      });
      result = await result.json();
      if(result){
        dispatch(authListOfUser(result));
      }else{
        dispatch(authFailed(result.message));
      }
    } catch (error) {
      dispatch(authError(error.message));
    }
  }

export const LogoutUser = () => async(dispatch) => {
  try {
    dispatch(authLogout());
  } catch (error) {
    console.log(error);
  }
}

