import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrainStore } from "../state/trainStore";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useTicketStore } from "../state/ticket";
import { saveTicket } from "../api/axiosInstances";
import useToast from "../hooks/useToast";

const Payment = () => {
  const params = useParams();
  const { id } = params;
  const [passengers, setPassengers] = React.useState({
    name: "",
    age: "",
    gender: "",
  });
  const [passengerData, setPassengerData] = React.useState<any>([]);
  const handleAddPassenger = () => {
    if(!passengers.name )
    {
      notify("Please fill name of passenger", "error");
      return;
    }

    if(!passengers.age )
    {
      notify("Please fill age of passenger", "error");
      return;
    }

    if(!passengers.gender)
    {
      notify("Please mention gender of passenger", "error");
      return;
    }
    setPassengerData([...passengerData, passengers]);
    
      ticketStore.ticket.passengerList.push(passengers)
    
    setPassengers({
      name: "",
      age: "",
      gender: "",
    })
  };

  const handleChangePassenger = (e: any) => {
    const { name, value } = e.target;
    setPassengers({ ...passengers, [name]: value });
  };
  const [paymentDetails, setPaymentDetails] = React.useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e: any) => {
    setPaymentDetails({ ...paymentDetails, focus: e.target.name });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const trainStore: any = useTrainStore();
  const trains = trainStore.trains;
  const train = trains.find((train: any) => train.train_no === id);
  const ticketStore: any = useTicketStore();
  const navigate = useNavigate();
  const { notify, ToastContainer } = useToast();
  const handleSubmit = async () => {

    if(!paymentDetails.cvc || !paymentDetails.expiry || !paymentDetails.name || !paymentDetails.number) {
      notify("Please fill all the card details", "error");
      return;
    }


    if (passengerData.length === 0) {
      notify("Please add passengers", "error");
      return;
    }

    const ticket = {
      train: {
        id: id,
        name: train?.name,
        from: train?.from,
        to: train?.to,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        price: 100,
      },
      passenger: {
        name: passengers.name,
        age: passengers.age,
        gender: passengers.gender,
      },
      passengerList: ticketStore.ticket.passengerList,
    };
    // save tickets
    const data = await saveTicket(ticket);
    console.log("saved ticket", data);
    ticketStore.setTicket(ticket);
    console.log("ticket", ticket);
    navigate("/gen-ticket");
  };

  return (
    <div>
      <ToastContainer />
      {/* Train Detail Card */}
      <Typography
        variant="h6"
        mt={3}
        fontWeight={200}
        sx={{ textAlign: "center" }}
      >
        Train Details
      </Typography>
      <Card elevation={3} sx={{ width: "80%", margin: "auto", mt: 3, p: 1 }}>
        {/* Train Detail Card Content */}

        <Typography variant="h6" fontWeight={200} display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
         <div>
          {train?.name}
         </div>
          <div>

           {id}
          </div>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            m: 1,
          }}
        >
          <Box>
            {train?.startTime} | {train?.from}
          </Box>
          <Box>{train?.travel_time}</Box>
          <Box>
            {train?.lastTime} | {train?.to}
          </Box>
        </Box>
        {/* <Box>Borading Station: {train?.train_base.from_stn_code}</Box> */}
      </Card>
      {/* Passenger Details */}
      <Typography
        variant="h6"
        mt={3}
        fontWeight={200}
        sx={{ textAlign: "center" }}
      >
        Passenger Details
      </Typography>
      {/* make a card to take passenger input */}

      {/* Passenger Details Card */}
      {passengerData?.map((passenger: any) => (
        <Card
          elevation={3}
          sx={{
            width: "80%",
            margin: "auto",
            mt: 3,
            mb: 2,
            p: 1,
            display: "flex",
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={200}>
            {passenger?.name}
          </Typography>
          <Typography variant="subtitle1" fontWeight={200}>
            {passenger?.age}
          </Typography>
          <Typography variant="subtitle1" fontWeight={200}>
            {passenger?.gender}
          </Typography>
        </Card>
      ))}
      {passengerData.length !== 0 && (
        <Typography variant="h6" fontWeight={200} sx={{ textAlign: "center" }}>
          Total Amount: {passengerData.length * 2.3*40*parseInt(train?.travel_time)}
        </Typography>
      )}

      <Box
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={passengers.name}
          onChange={(e) => handleChangePassenger(e)}
          variant="outlined"
          sx={{ m: 1 }}
          type="text"
        />
        <TextField
          label="Age"
          name="age"
          value={passengers.age}
          onChange={(e) => handleChangePassenger(e)}
          variant="outlined"
          sx={{ m: 1 }}
          type="number"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={passengers.gender}
            name="gender"
            label="Gender"
            sx={{
              width: "10rem",
              height: "3.5rem",
            }}
            onChange={(e) => handleChangePassenger(e)}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={handleAddPassenger}
          sx={{
            width: "2rem",
            height: "2rem",
            m: 1,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <Typography variant="h6" fontWeight={200}>
            +
          </Typography>
        </IconButton>
      </Box>

      {/* Payment Form */}
      <Typography
        variant="h6"
        mt={3}
        fontWeight={200}
        sx={{ textAlign: "center" }}
      >
        Payment Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Cards
          cvc={paymentDetails.cvc}
          expiry={paymentDetails.expiry}
          name={paymentDetails.name}
          number={paymentDetails.number}
        />
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          <TextField
            label="Card Number"
            variant="outlined"
            sx={{ m: 1 }}
            type="number"
            name="number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            label="Name"
            variant="outlined"
            sx={{ m: 1 }}
            type="text"
            name="name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            label="Expiry"
            variant="outlined"
            sx={{ m: 1 }}
            type="text"
            name="expiry"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            label="CVC"
            variant="outlined"
            sx={{ m: 1 }}
            type="number"
            name="cvc"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Book Your Ticket
        </Button>
      </Box>
    </div>
  );
};

export default Payment;
