import { Box, Card, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TrainCard from "../components/TrainCard";
import { useTrainStore } from "../state/trainStore";
import dayjs from "dayjs";

const Enquiry = () => {
  const trainStore: any = useTrainStore();
  const trains = trainStore.trains;
  console.log("trains", trains);
  console.log("date", trainStore.date);
  return (
    <Stack>
      <Card elevation={1}>
        <Box
          component="form"
          sx={{
            height: "fit-content",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "75%",
            margin: "auto",
          }}
        >
          <TextField
            label="From"
            type="text"
            variant="outlined"
            required
            disabled
            value={trainStore.from}
          />
          <SwapHorizIcon />
          <TextField
            label="To"
            type="text"
            disabled
            variant="outlined"
            required
            value={trainStore.to}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              readOnly
              format="DD/MM/YYYY"
              defaultValue={dayjs(trainStore.date)}
            />
          </LocalizationProvider>

          {/* <Button variant="contained" type="submit">
            Modify Search
          </Button> */}
        </Box>
      </Card>

      {/* Train Card */}
      {trains?.length > 0 ?
      <div>
        {

          trains?.map((train: any, id: number) => (
            <TrainCard key={id} {...train} />
            ))
          }
      </div>
      :
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      
      }}>
        <div>
          <img src="no.gif" alt="" />
        </div>
        <h1>No Trains found</h1>
      </div>
      }
    </Stack>
  );
};

export default Enquiry;
