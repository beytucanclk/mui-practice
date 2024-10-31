import { Button, Link, Modal, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import axios from "axios";
import { TextField } from "@mui/material";
import { styled } from "@material-ui/styles";


import { useForm } from "react-hook-form";
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

const UserModal = ({ showModal, onToggle, user }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user && user.data ? user.data.name : "",
      surname: user && user.data ? user.data.surname :  "",
      email: user && user.data ? user.data.email : "",
      phone: user && user.data ? user.data.phone :  "",
      jobTitle: user && user.data ? user.data.jobTitle :  "",
      imageUrl: user && user.data ? user.data.imageUrl : ""
    },
  });

  const onSubmit = (data) => {
    try {
      let auth = JSON.parse(localStorage.getItem('user'))
      if(user && user.data){
        axios.put(`http://localhost:8080/users/` + user.data.id, data, {
          auth: {
            username: auth.username,
            password: auth.password
          }
        })
      .then(r => {
       }
      ).catch( err => {
        alert("kullanıcı adı veya şifre yanlış")
      }

      );
      }else{
        axios.post(`http://localhost:8080/users`, {
          name : data.name,
          surname: data.surname,
          phone: data.phone,
          email: data.email,
          jobTitle: data.jobTitle,
          imageUrl: data.imageUrl
        },
          {
            auth: {
              username: auth.username,
              password: auth.password
            }
          }
        )
        .then(r => {
          window.location.reload();

         }
        ).catch( err => {
          alert("kullanıcı adı veya şifre yanlış")
        }
  
        );
      }
      
    } catch (error) {
      throw error;
    }
  }

  return (
    <Modal
      open={showModal}
      onClose={onToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          margin: "auto",
          maxWidth: 450,
          bgcolor: "#ffffff",
          outline: "none",
          borderRadius: 3,
          minHeight: 150,
          p: 3,
          textAlign: "justify",
          boxShadow: `5px 5px 10px #67787f, -5px -5px 10px #637c66`,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Employee 
        </Typography>


      <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="Name"
            {...register("name", { required: true })}
            error={errors.name ? true : false}
            helperText={errors.name && "Enter a valid name"}
          />

        <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="Surname"
            {...register("surname", { required: true })}
            error={errors.surname ? true : false}
            helperText={errors.surname && "Enter a valid surname"}
          />
       </Box>
       


  
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="email"
          {...register("email", { required: true })}
          error={errors.email ? true : false}
          helperText={errors.email && "Enter a valid full email"}
        />

        
      <TextField
        variant="outlined"
        fullWidth
        type="Text"
        label="Phone"
        {...register("phone", { required: true })}
        error={errors.phone ? true : false}
        helperText={errors.phone && "Enter a valid phone"}
      />

        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="jobTitle"
          {...register("jobTitle", { required: true })}
          error={errors.jobTitle ? true : false}
          helperText={errors.jobTitle && "Enter a valid jobTitle"}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="imageUrl"
          {...register("imageUrl", { required: true })}
          error={errors.imageUrl ? true : false}
          helperText={errors.imageUrl && "Enter a valid imageUrl"}
        />

      {/* submit */}
      <Button type="submit" variant="contained" disableElevation>
        Register
      </Button>
    </FormStyle>
    </Box>

    </Modal>
  );
};

export default UserModal;
