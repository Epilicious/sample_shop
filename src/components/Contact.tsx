import React, { ReactElement, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
        display: "flex",
        flexDirection: "column",
      },
    },
    reason: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    end: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  })
);

interface Inputs {
  firstName: string;
}

function Contact(): ReactElement {
  const { control, handleSubmit } = useForm({ mode: "onBlur" });

  const classes = useStyles();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="lg">
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{
            minLength: {
              value: 2,
              message: "First Name must contain atleast 2 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              id="firstName"
              label="First Name"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{
            minLength: {
              value: 2,
              message: "Last Name must contain atleast 2 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Last Name"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              message: "Email is incorrect",
              value: /^\S+@\S+\.\S+$/,
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <span className={classes.reason}>
          <InputLabel id="subject">Reason:</InputLabel>
          <Controller
            name="subject"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  label="Reason"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={"order"}>Order</MenuItem>
                  <MenuItem value={"delivery"}>Delivery</MenuItem>
                  <MenuItem value={"return"}>Return</MenuItem>
                </Select>
              </>
            )}
          />
        </span>
        <span className={classes.end}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                value={field.value}
                onChange={field.onChange}
                rowsMin={6}
              />
            )}
          />
          <Button variant="contained" type="submit">
            Contact Us
          </Button>
        </span>
      </form>
    </Container>
  );
}

export default Contact;
