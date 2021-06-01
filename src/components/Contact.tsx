import React, { ReactElement, SyntheticEvent, useState } from "react";
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
  })
);

interface Inputs {
  firstName: string;
}

function Contact(): ReactElement {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [subject, setSubject] = useState<string>("");
  const classes = useStyles();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubject(event.target.value as string);
  };

  console.log(errors.firstName == false);
  return (
    <Container maxWidth="lg">
      <form
        className={classes.root}
        onBlur={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="First Name"
          control={control}
          defaultValue=""
          rules={{
            minLength: {
              value: 2,
              message: "First Name must contain atleast 2 characters",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="First Name"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="Last Name"
          control={control}
          defaultValue=""
          rules={{
            minLength: {
              value: 2,
              message: "Last Name must contain atleast 2 characters",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Last Name"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="Email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: { message: "Email is incorrect", value: /^\S+@\S+\.\S+$/ },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Select
          labelId="subject"
          id="subject"
          value={subject}
          onChange={handleChange}
        >
          <MenuItem value={10}>Order</MenuItem>
          <MenuItem value={20}>Delivery</MenuItem>
          <MenuItem value={30}>Return</MenuItem>
        </Select>
        <TextareaAutosize rowsMin={6} />
        <Button variant="contained" type="submit">
          Contact Us
        </Button>
      </form>
    </Container>
  );
}

export default Contact;
