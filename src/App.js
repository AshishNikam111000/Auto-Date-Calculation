import "./App.scss";
import { useRef, useState } from "react";

import DateTimePicker from "react-datetime-picker";

function App() {
  const duration = useRef();
  const durationType = useRef();
  const [FromValue, setFromValue] = useState(new Date());
  const [ToValue, setToValue] = useState(new Date("2021-1-01 20:23"));

  function setToDate() {
    var today = FromValue;
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var hh = today.getHours();
    var minutes = today.getMinutes();

    switch (durationType.current.value) {
      case "Minutes":
        if (duration.current.value) minutes += parseInt(duration.current.value);
        break;
      case "Hours":
        if (duration.current.value) hh += parseInt(duration.current.value);
        break;
      case "Days":
        if (duration.current.value) dd += parseInt(duration.current.value);
        break;
      case "Months":
        if (duration.current.value) mm += parseInt(duration.current.value);
        break;
      case "Years":
        if (duration.current.value) yyyy += parseInt(duration.current.value);
        break;
    }

    if (minutes > 59) {
      hh += Math.floor(minutes / 60);
      minutes %= 60;
    }
    if (hh > 24) {
      dd += Math.floor(hh / 24);
      hh %= 24;
    }
    if (dd > 31) {
      mm += Math.floor(dd / 31);
      dd %= 31;
    }
    if (mm > 12) {
      yyyy += Math.floor(mm / 12);
      mm %= 12;
    }

    setToValue(new Date(`${yyyy}-${mm}-${dd} ${hh}:${minutes}`));
  }

  return (
    <div className="App h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-black">
        <table className="Table">
          <tr>
            <td>From Date:</td>
            <td>
              <DateTimePicker
                onChange={setFromValue}
                value={FromValue}
                format="y-MM-dd HH:mm"
                disableClock={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              Duration (in hours):
              <div className="border-2 border-black w-fit">
                <select ref={durationType} name="Duration-Type" id="duration">
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
              </div>
            </td>
            <td>
              <input
                ref={duration}
                className="InputText"
                type="number"
                onChange={setToDate}
              />
            </td>
          </tr>
          <tr>
            <td>To Date:</td>
            <td>
              <DateTimePicker
                onChange={setToValue}
                value={ToValue}
                format="y-MM-dd HH:mm"
                disableClock={true}
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
