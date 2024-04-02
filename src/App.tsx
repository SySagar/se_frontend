import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function App() {
  const [classes, setClasses] = useState<string>("");
  return (
    <div className="App">
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          backgroundImage:
            "url(https://www.newsclick.in/sites/default/files/2019-06/ir_0.PNG)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Card
          sx={{
            height: "fit-content",
            width: 400,
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            gap: 4,
          }}
        >
          <Typography variant="h4" fontWeight={400}>
            Book Ticket
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              label="From"
              variant="outlined"
              sx={{
                width: "75%",
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" format="DD/MM/YYYY" />
            </LocalizationProvider>
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField label="To" variant="outlined" fullWidth />
          </Box>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classes}
              label="Category"
              onChange={(e) => setClasses(e.target.value as string)}
            >
              <MenuItem value={"General"}>General</MenuItem>
              <MenuItem value={"Tatkal"}>Tatkal</MenuItem>
              <MenuItem value={"Ladies"}>Ladies</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" fullWidth>
            Search
          </Button>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            filter: "drop-shadow(0px 0px 6px black)",
            p: 1,
          }}
        >
          <Typography variant="h3" color={"white"} fontWeight={700}>
            Better Indian Railways
          </Typography>
          <Typography variant="h5" color={"white"}>
            Safety | Security | Comfort
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
