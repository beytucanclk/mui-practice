import { Button, IconButton, InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { useHistory } from "react-router-dom";

// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
  "& label.Mui-focused": {
    color: theme.palette.success.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.success.main,
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // Button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "none",
    },
  },
}));

const FormRegister = () => {
  const [showPassword, setShowPassord] = useState(false);
  const handleTogglePassword = () => setShowPassord(!showPassword);
  const history = useHistory();
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username:"",
      fullName: "",
      email: "",
      password: "",
    },
  });

  // submit
  const onSubmit = (data) => {
    try {
      data = {
        appUserRole : "ROLE_ADMIN",
        ...data
      }
      axios.post(`http://localhost:8080/register`, data)
      .then(r => {
        history.push('/login')
      }
      ).catch( err => {
        alert("kullanıcı adı veya şifre yanlış")
      }

      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
       <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Username"
          {...register("username", { required: true })}
          error={errors.username ? true : false}
          helperText={errors.username && "Enter a valid username"}
        />

  
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Full Name"
          {...register("fullName", { required: true })}
          error={errors.fullName ? true : false}
          helperText={errors.fullName && "Enter a valid full name"}
        />

        
      <TextField
        variant="outlined"
        fullWidth
        type="email"
        label="Email address"
        {...register("email", { required: true })}
        error={errors.email ? true : false}
        helperText={errors.email && "Enter a valid email address"}
      />

      {/* password */}
      <TextField
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
        })}
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)"
        }
      />

      {/* submit */}
      <Button type="submit" variant="contained" disableElevation>
        Register
      </Button>
    </FormStyle>
  );
};

export default FormRegister;
