import "./App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import random from "random-number";
import { withTheme } from "@emotion/react";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [reservedJobs, setReservedJobs] = useState([]);
  const [petURL, setPetURL] = useState("");
  const [petName, setPetName] = useState("");
  const [petPrice, setPetPrice] = useState("");

  const [modifyPetURL, setModifyPetURL] = useState("");
  const [modifyPetName, setModifyPetName] = useState("");
  const [modifyPetPrice, setModifyPetPrice] = useState("");
  const [modifyID, setModifyID] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const handleJobCreation = () => {
    setJobs([
      ...jobs,
      {
        name: petName,
        url: petURL,
        price: petPrice,
        id: random({ integer: true, min: 0, max: 100000 }),
      },
    ]);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleJobReserve = (j) => {
    let newJobs = jobs.filter((job) => {
      if (job.id !== j.id) {
        return job;
      }
    });

    setJobs(newJobs);

    setReservedJobs([...reservedJobs, j]);
  };

  const handleJobModification = () => {
    let newJobs = jobs.filter((job) => {
      if (job.id !== modifyID) {
        return job;
      }
    });

    setJobs([
      ...newJobs,
      {
        name: modifyPetName,
        url: modifyPetURL,
        price: modifyPetPrice,
        id: modifyID,
      },
    ]);
  };

  const toggleModifyModal = (j) => {
    setIsModifyOpen(!isModifyOpen);

    console.log(j);
    if (j) {
      setModifyPetName(j.name);
      setModifyPetURL(j.url);
      setModifyPetPrice(j.price);
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="buttonwrapper">
          <Button onClick={toggleModal} fullWidth variant="contained">
            Add A Job
          </Button>
        </div>
        <div className="jobs">
          <h1>Posted Jobs</h1>
          {jobs.map((j, i) => {
            return (
              <div key={i}>
                <div className="imagewrap">
                  <img className="dogimg" src={j.url} />
                </div>
                <p>{j.name}</p>
                <p>${j.price} USD p/ hr</p>
                <p>{j.id} Miles Away</p>
                <Button
                  variant="contained"
                  onClick={() => {
                    toggleModifyModal(j);
                    setModifyID(j.id);
                  }}
                >
                  Modify
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    handleJobReserve(j);
                  }}
                >
                  Reserve
                </Button>
                <Modal open={isModifyOpen} onClose={() => toggleModifyModal(j)}>
                  <Box sx={style}>
                    <TextField
                      value={modifyPetName}
                      onChange={(e) => {
                        setModifyPetName(e.target.value);
                      }}
                      id="standard-basic"
                      label="Pet Name"
                      variant="standard"
                    />
                    <TextField
                      value={modifyPetPrice}
                      onChange={(e) => {
                        setModifyPetPrice(e.target.value);
                      }}
                      id="standard-basic"
                      label="Price"
                      variant="standard"
                    />
                    <TextField
                      value={modifyPetURL}
                      onChange={(e) => {
                        setModifyPetURL(e.target.value);
                      }}
                      id="standard-basic"
                      label="Pet Image URL"
                      variant="standard"
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleJobModification();
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Modal>
              </div>
            );
          })}
        </div>
        <div className="reserved">
        <h1>Reserved Jobs</h1>
          {reservedJobs.map((j, i) => {
            console.log(i);
            return (
              <div key={i}>
                <div className="imagewrap">
                  <img className="dogimg" src={j.url} />
                </div>
                <p>{j.name}</p>
                <p>{j.price}</p>
                <p>{j.id} Miles Away</p>
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={isOpen} onClose={toggleModal}>
        <Box sx={style}>
          <TextField
            value={petName}
            onChange={(e) => {
              console.log(e.target);
              setPetName(e.target.value);
            }}
            id="standard-basic"
            label="Pet Name"
            variant="standard"
          />
          <TextField
            value={petPrice}
            onChange={(e) => {
              setPetPrice(e.target.value);
            }}
            id="standard-basic"
            label="Price"
            variant="standard"
          />
          <TextField
            value={petURL}
            onChange={(e) => {
              setPetURL(e.target.value);
            }}
            id="standard-basic"
            label="Pet Image URL"
            variant="standard"
          />
          <Button variant="contained" onClick={handleJobCreation}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
