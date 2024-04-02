import React from "react";
import "../index.scss";
import { useTicketStore } from "../state/ticket";
import { Box, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Ticket = () => {
  const ticketStore: any = useTicketStore();
  const ticket = ticketStore.ticket;

  return (
    <div>
      {/* ticket template with mui */}
      <div className="main-content" id="ticket">
        <div className="ticket">
          <div className="ticket__main">
            <div className="header">{ticket?.train.name}</div>
            <div className="info passenger">
              <div className="info__item">Passenger</div>
              <div className="info__detail">{ticket?.passenger.name}</div>
            </div>
            <div className="info platform">
              {" "}
              <span>Depart </span>
              <span>from </span>
              <span>platform</span>
              <div className="number">
                <div>9</div>
                <div>
                  {" "}
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>
            </div>
            <div className="info departure">
              <div className="info__item">Depart</div>
              <div className="info__detail">{ticket?.train.from}</div>
            </div>
            <div className="info arrival">
              <div className="info__item">Arrive</div>
              <div className="info__detail">{ticket?.train.to}</div>
            </div>
            <div className="info date">
              <div className="info__item">Date</div>
              <div className="info__detail">{ticket?.train.date}</div>
            </div>
            <div className="info time">
              <div className="info__item">Time</div>
              <div className="info__detail">{ticket?.train.time}</div>
            </div>
            <div className="info carriage">
              <div className="info__item">car</div>
              <div className="info__detail">4</div>
            </div>
            <div className="info seat">
              <div className="info__item">Seat</div>
              <div className="info__detail">6B</div>
            </div>
            <div className="fineprint">
              <p>
                Boarding begins 30 minutes before departure. Snacks available
                for purchase from IRCTC 2.0 e-catering.
              </p>
              <p>
                This ticket is Non-refundable • VSSUT Railway
                Authority
              </p>
            </div>
            <div className="snack">
              <svg viewBox="0 -11 414.00053 414">
                <path d="m202.480469 352.128906c0-21.796875-17.671875-39.46875-39.46875-39.46875-21.800781 0-39.472657 17.667969-39.472657 39.46875 0 21.800782 17.671876 39.472656 39.472657 39.472656 21.785156-.023437 39.445312-17.683593 39.46875-39.472656zm0 0"></path>
                <path d="m348.445312 348.242188c2.148438 21.691406-13.695312 41.019531-35.390624 43.167968-21.691407 2.148438-41.015626-13.699218-43.164063-35.390625-2.148437-21.691406 13.695313-41.019531 35.386719-43.167969 21.691406-2.148437 41.019531 13.699219 43.167968 35.390626zm0 0"></path>
                <path d="m412.699219 63.554688c-1.3125-1.84375-3.433594-2.941407-5.699219-2.941407h-311.386719l-3.914062-24.742187c-3.191407-20.703125-21.050781-35.9531252-42-35.871094h-42.699219c-3.867188 0-7 3.132812-7 7s3.132812 7 7 7h42.699219c14.050781-.054688 26.03125 10.175781 28.171875 24.0625l33.800781 213.515625c3.191406 20.703125 21.050781 35.957031 42 35.871094h208.929687c3.863282 0 7-3.132813 7-7 0-3.863281-3.136718-7-7-7h-208.929687c-14.050781.054687-26.03125-10.175781-28.171875-24.0625l-5.746094-36.300781h213.980469c18.117187-.007813 34.242187-11.484376 40.179687-28.597657l39.699219-114.578125c.742188-2.140625.402344-4.511718-.914062-6.355468zm0 0"></path>
              </svg>
            </div>
            <div className="barcode">
              <div className="barcode__scan"></div>
              <div className="barcode__id">{ticket?.train.id}</div>
            </div>
          </div>
          <div className="ticket__side">
            <div className="logo">
              <p>{ticket?.train.name}</p>
            </div>
            <div className="info side-arrive">
              <div className="info__item">Arrive</div>
              <div className="info__detail">{ticket?.train.to}</div>
            </div>
            <div className="info side-depart">
              <div className="info__item">Depart</div>
              <div className="info__detail">{ticket?.train.from}</div>
            </div>
            <div className="info side-date">
              <div className="info__item">Date</div>
              <div className="info__detail">{ticket?.train.date}</div>
            </div>
            <div className="info side-time">
              <div className="info__item">Time</div>
              <div className="info__detail">{ticket?.train.time}</div>
            </div>
            <div className="barcode">
              <div className="barcode__scan"></div>
              <div className="barcode__id">{ticket?.train.id}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Button to download ticket */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const input = document.getElementById("ticket");
            html2canvas(input as HTMLElement).then((canvas) => {
              const imgData = canvas.toDataURL("image/png", 1.0);
              const pdf = new jsPDF("l", "mm", "a4");

              pdf.addImage(imgData, "JPEG", 10, 10, 280, 150);
              pdf.save("download.pdf");
            });
          }}
        >
          Download Ticket
        </Button>
      </Box>
    </div>
  );
};

export default Ticket;
