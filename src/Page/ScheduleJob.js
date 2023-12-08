import '../App.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { doPost, doGet, doDelete } from "../actions/common";
import { useDispatch, useSelector } from "react-redux";

function ScheduleJob() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState([]);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [space, setSpace] = useState('');
  console.log('items', items);
  const handleDateSelect = (date) => {
    setItems({...items , selected_date: date})
    setSelectedDate(format(date, 'dd/MM/yyyy'));
  }

  const handleItemsInput = (e) =>{
    setItems({...items, [e.target.name]:e.target.value})

    if(e.target.name == 'living_space'){
        setSpace(e.target.value);
    }

    if(e.target.name == 'furnace'){
        calculate(space);
    }
}

const onSubmitform = (e) =>{
    setItems({...items, amount:amount})
    alert(JSON.stringify(items))
}
const calculate = (space) => {
    dispatch(doGet("calculate?space="+space))
      .then((response) => { 
        if(response.data){
            setAmount(response.data.final_price);
        }
      })
      .catch((message) => {
        
      });
  };
  
  return (
    <div className="page_content">
        <h2 className="p-4">Receive a free quote and schedule online today!</h2>
        <div className="mx-4 p-2"> 
        <div className="grid grid-cols-2 divide-x-4"> 
            <div>
            <div class="flex items-center">
              <div class="w-full">
                <h2 class="text-center font-bold text-2xl uppercase mb-2">Fill out our form</h2>
                <div class="bg-white p-10 rounded-lg">
                <form method='post'>
                      <div class="grid gap-6 mb-6 md:grid-cols-1">
                          <div>
                              <label for="service"   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Needed</label>
                              <select name="serviceneeded" onChange={(e) => handleItemsInput(e)} id="serviceneeded" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
                                  <option value="" disabled="" selected=""> Service Needed* </option>
                                  <option value="Residential">Residential Air Duct Cleaning</option>
                                  <option value="Commercial">Commercial Air Duct Cleaning</option>
                                </select>
                          </div>
                      </div>
                      <div class="grid gap-6 mb-6 md:grid-cols-2">
                          <div>
                              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                              <input type="text" onChange={(e) => handleItemsInput(e)} name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                          </div>  
                          <div>
                              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                              <input type="text" onChange={(e) => handleItemsInput(e)} name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon" required />
                          </div>
                          <div>
                              <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                              <input type="text"  onChange={(e) => handleItemsInput(e)} name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                              <label for="zip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip</label>
                              <input type="text" onChange={(e) => handleItemsInput(e)} name="zip" id="zip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                              <label for="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                              <input type="text" onChange={(e) => handleItemsInput(e)} name="state" id="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                              <input type="text"  onChange={(e) => handleItemsInput(e)} id="address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                              <label for="ph" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                              <input type="phone" onChange={(e) => handleItemsInput(e)} name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                          </div>  
                          <div>
                              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                              <input type="email" name='email' onChange={(e) => handleItemsInput(e)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  required />
                          </div>
                          <div>
                              <label for="Amistee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How did you first hear about Amistee?*</label>
                              <input type="text" name="amistee" onChange={(e) => handleItemsInput(e)} id="amistee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                              <label for="living_space" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Approx. Sq. Footage of Living Space (Not Including Basement)*</label>
                              <input type="text" name="living_space" onChange={(e) => handleItemsInput(e)} id="living_space" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div>
                          <label for="rescheduling" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Location of your Furnace*</label>
                            <select name="locfurnace" id="locfurnace" onChange={(e) => handleItemsInput(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Select Location of your Furnace*</option>
                                <option value="Basement">Basement</option>
                                <option value="Crawl Space">Crawl Space</option>
                                <option value="Attic">Attic</option>
                                <option value="Slab">Slab</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                          </div>
                          <div>
                          <label for="rescheduling" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Are you rescheduling an existing appointment?</label>
                            <select name="reschedule" onChange={(e) => handleItemsInput(e)} id="reschedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                          <label for="furnace" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Number of Furnace*</label>
                            <select name="furnace" onChange={(e) => handleItemsInput(e)} id="furnace" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3+</option>
                            </select>
                          </div>
                          <div>
                          <label for="vent_cleaning" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Dryer Vent Cleaning?*</label>
                            <select name="vent_cleaning" onChange={(e) => handleItemsInput(e)} id="reschedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                          </div>
                          <h4 class="font-weight-bold"> YOUR QUOTE <br/> AIR DUCT CLEANING QUOTE: $&nbsp; <span id="amount">{amount}</span>
                                <span id="selectedTime"></span>
                            </h4>
                      </div>
                      <button type="button" onClick={() => onSubmitform()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                </div>
              </div>
              </div>
            </div> 
            <div>
            <DatePicker inline selected={startDate} onSelect={handleDateSelect}  onChange={(date) => setStartDate(date)} />
            <h4 class="font-weight-bold"> Your Selected <br/> Date and Time:&nbsp; <span id="selectedDate">{selectedDate}</span>
                <span id="selectedTime"></span>
            </h4>
            </div> 
        </div> 
    </div> 

    </div>
  );
}

export default ScheduleJob;
