import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import TrainIcon from "@mui/icons-material/Train";
import { TrainProps } from "../types/trainProps";
import { Link } from "react-router-dom";
import { authStore } from "../state/auth";
const TrainCard = (props: TrainProps) => {
  const authState: any = authStore();
  console.log("authState", props.train_no);
  return (
    <Card
      elevation={3}
      sx={{
        width: "90%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "evenly",
        mt: 3,
      }}
    >
      <Box
        sx={{
          height: "fit-content",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <TrainIcon />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            {props.name}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} color={'green'}>
            {props.train_no}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={400}>
            From {props.from}
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
          Departure Time 
            <p
            style={
              {
                color:'red',
                fontWeight:700,
                fontSize:15,
                padding:0,
                margin:0
              }
            }
            >
           {props.startTime}
            </p>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={400}>
            To {props.to}
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
           Arrival Time 
           <p style={{
              color:'red',
              fontWeight:700,
              fontSize:15,
              padding:0,
              margin:0
           }}>
           {props.lastTime}
           </p>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={400}>
            Duration {props.travel_time}hr
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            Distance 
            <p
            style={{
              fontWeight:700,
              fontSize:15,
              padding:0,
              margin:0
            }}
            >
            250km
            </p>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={100}>
            Classes General
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}  sx={{color:'green',fontWeight:700}}>
            Fare ₹{(parseInt(props.travel_time) * 33.3 as Number).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={100}>
            Available Seats
          </Typography>
          <Typography variant="subtitle2" fontWeight={400} sx={{color:'red',fontWeight:700}}>
            {props.seats}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Link to={authState.auth ? `/payment/${props.train_no}` : "/login"}>
          <Button variant="contained">Book</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default TrainCard;
