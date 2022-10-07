
import React, { useEffect, useState, useCallback } from "react"
import { useParams,useHistory } from 'react-router-dom';
import { getSingleStaff } from "../../lib/api";
import useHttp from "../../lib/use-http";
import Card from "../../components/UI/card";
import DetailCard from "../../components/UI/DetailCard";
import StaffDetail from "./StaffDetail";

const FIREBASE_DOMAIN = "https://userdetails-d84c5-default-rtdb.firebaseio.com";

const StaffHome = () => {
  const hist=useHistory();
  const param = useParams();
  const [id, setId] = useState("");
  const userId = param.qid;
  console.log(userId);
  const fetchData = useCallback(
    async function () {
      const response = await fetch(`${FIREBASE_DOMAIN}/staff.json`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch staff.");
      }

      const transformedQuotes = [];

      for (const key in data) {
        const quoteObj = {
          id: key,
          ...data[key],
        };

        transformedQuotes.push(quoteObj);
      }

      for (const key in transformedQuotes) {
        if (transformedQuotes[key]["email"] === userId) {
          const sId = transformedQuotes[key]["id"];
          setId(sId);
          return;
        };
      }
    }, [userId]
  )
  fetchData();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleStaff, true);


  useEffect(() => {
    sendRequest(id);

  }, [sendRequest, id]);
  const myTimeout = setTimeout(loadedQuote, 10000);
  console.log(loadedQuote);
  function myStopFunction() {
    clearTimeout(myTimeout);
  }

  if (status === "pending") {
    return (
      <div className="centered">
        Waiting...
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.email) {
    return <p>Fetching...</p>;
  }
  // useEffect(()=>{
  //   const user=loadedQuote["user"];

  //   console.log(user);
  //   setData({
  //     name:user,
  //     //email:email
  //   })
  // },[])

  myStopFunction();
  const navigateTo=()=>{
    hist.push(`/staff/profile/${userId}`)
    }
  const k = loadedQuote.user;
  const l = loadedQuote.email
  return (
    <React.Fragment>
      <Card
        title={k}
        images="https://cdn-icons-png.flaticon.com/512/2354/2354280.png"

        alt="batman"
        name={l}
      />
      <DetailCard>

       <StaffDetail id={id}></StaffDetail>
       <button onClick={navigateTo}>Update Details</button>
      </DetailCard>


    </React.Fragment>
  )

}
export default StaffHome;